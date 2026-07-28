
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = process.env.FIGMA_FILE_ID || 'gcyKHDkzf9yo8XfuIvUYH2';

if (!FIGMA_TOKEN) {
  console.error(' FIGMA_TOKEN not found in .env.local');
  process.exit(1);
}
async function figmaGet(endpoint) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  return res.json();
}
function rgbaToHex(r, g, b, a = 1) {
  const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  const base = `#${h(r)}${h(g)}${h(b)}`;
  return a < 1 ? base + h(a) : base;
}

function colorKey(r, g, b, a) {
  return `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${Math.round((a ?? 1) * 100)}`;
}
function collectColors(node, map = new Map()) {
  const fills = node.fills || [];
  for (const fill of fills) {
    if (fill.type === 'SOLID' && fill.visible !== false) {
      const { r, g, b } = fill.color;
      const opacity = fill.opacity ?? 1;
      const key = colorKey(r, g, b, opacity);
      if (!map.has(key)) {
        map.set(key, { hex: rgbaToHex(r, g, b, opacity), usedIn: node.name });
      }
    }
  }
  const strokes = node.strokes || [];
  for (const stroke of strokes) {
    if (stroke.type === 'SOLID' && stroke.visible !== false) {
      const { r, g, b } = stroke.color;
      const key = colorKey(r, g, b, 1);
      if (!map.has(key)) {
        map.set(key, { hex: rgbaToHex(r, g, b, 1), usedIn: `${node.name} (stroke)` });
      }
    }
  }
  if (node.children) {
    for (const child of node.children) collectColors(child, map);
  }
  return map;
}
function toCssVar(name) {
  return '--' + name.toLowerCase()
    .replace(/\s*\/\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function toCamel(name) {
  return name.toLowerCase()
    .replace(/[\s/-]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}
function nameColors(colorMap) {
  const named = {};
  let i = 1;
  for (const [, { hex }] of colorMap) {
    const lower = hex.toLowerCase();
    let name;
    if (lower === '#ffffff') name = 'white';
    else if (lower === '#000000') name = 'black';
    else if (lower.startsWith('#4c3c6b') || lower.startsWith('#4c3c6b')) name = 'purple-dark';
    else if (lower.startsWith('#7b6a9d')) name = 'purple-mid';
    else if (lower.startsWith('#f5f0ff') || lower.startsWith('#ede8f5')) name = 'purple-light';
    else if (lower.startsWith('#f')) name = `neutral-${i++}`;
    else name = `color-${i++}`;
    if (named[name]) name = `${name}-${i++}`;
    named[name] = hex;
  }
  return named;
}
async function main() {
  console.log(' Fetching Figma styles...');
  const stylesResp = await figmaGet(`/files/${FILE_ID}/styles`);
  const styles = stylesResp.meta.styles;
  console.log(`   Found ${styles.length} styles`);

  const nodeIds = styles.map((s) => s.node_id).join(',');
  const nodesResp = await figmaGet(`/files/${FILE_ID}/nodes?ids=${nodeIds}`);

  const namedColors = {};
  const typography = {};

  for (const style of styles) {
    const doc = nodesResp.nodes[style.node_id]?.document;
    if (!doc) continue;

    if (style.style_type === 'FILL') {
      const fill = doc.fills?.[0];
      if (fill?.type === 'SOLID') {
        const { r, g, b } = fill.color;
        namedColors[style.name] = rgbaToHex(r, g, b, fill.opacity ?? 1);
      }
    }

    if (style.style_type === 'TEXT') {
      const s = doc.style || {};
      typography[style.name] = {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeightPx ? `${Math.round(s.lineHeightPx)}px` : undefined,
        letterSpacing: s.letterSpacing || undefined,
      };
    }
  }
  console.log(' Scanning document for colors...');
  const fileData = await figmaGet(`/files/${FILE_ID}`);
  const colorMap = collectColors(fileData.document);
  console.log(`   Found ${colorMap.size} unique colors in document`);
  const autoColors = nameColors(colorMap);
  const allColors = { ...autoColors, ...namedColors }; // named styles override auto
  const variables = {};
  try {
    console.log(' Fetching Figma Variables...');
    const varResp = await figmaGet(`/files/${FILE_ID}/variables/local`);
    const allVars = varResp.meta?.variables || {};
    const collections = varResp.meta?.variableCollections || {};
    for (const variable of Object.values(allVars)) {
      const collection = collections[variable.variableCollectionId];
      const modeId = collection ? Object.keys(collection.modes)[0] : null;
      const value = modeId ? variable.valuesByMode[modeId] : null;
      if (variable.resolvedType === 'COLOR' && value && 'r' in value) {
        variables[variable.name] = rgbaToHex(value.r, value.g, value.b, value.a ?? 1);
      }
    }
    console.log(`   Found ${Object.keys(variables).length} variables`);
  } catch {
    console.log('   Variables API skipped (Starter plan)');
  }

  const finalColors = { ...allColors, ...variables };
  let css = '/* Generated from Figma. Do not edit manually. */\n\n:root {\n';

  css += '\n';
  for (const [name, value] of Object.entries(finalColors)) {
    css += `  ${toCssVar(name)}: ${value};\n`;
  }

  css += '\n';
  for (const [name, t] of Object.entries(typography)) {
    if (t.fontSize)   css += `  ${toCssVar(name)}-size: ${t.fontSize}px;\n`;
    if (t.lineHeight) css += `  ${toCssVar(name)}-line-height: ${t.lineHeight};\n`;
    if (t.fontWeight) css += `  ${toCssVar(name)}-weight: ${t.fontWeight};\n`;
  }

  css += '}\n';
  let ts = '// Generated from Figma. Do not edit manually.\n\n';
  ts += 'export const figmaTokens = {\n';
  ts += '  colors: {\n';
  for (const [name, value] of Object.entries(finalColors)) {
    ts += `    ${toCamel(name)}: '${value}',\n`;
  }
  ts += '  },\n  typography: {\n';
  for (const [name, t] of Object.entries(typography)) {
    const clean = Object.fromEntries(Object.entries(t).filter(([, v]) => v != null));
    ts += `    ${toCamel(name)}: ${JSON.stringify(clean)},\n`;
  }
  ts += '  },\n} as const;\n';
  const stylesDir = path.join(process.cwd(), 'styles');
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.writeFileSync(path.join(stylesDir, 'figma-tokens.css'), css, 'utf8');
  console.log(' src/styles/figma-tokens.css');

  const libDir = path.join(process.cwd(), 'lib');
  fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(path.join(libDir, 'figma-tokens.ts'), ts, 'utf8');
  console.log(' src/lib/figma-tokens.ts');

  console.log(`\n ${Object.keys(finalColors).length} colors , ${Object.keys(typography).length} text styles`);
}

main().catch((err) => {
  console.error('', err.message);
  process.exit(1);
});
