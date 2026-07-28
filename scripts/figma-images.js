
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = process.env.FIGMA_FILE_ID || 'gcyKHDkzf9yo8XfuIvUYH2';
const SCALE = process.env.FIGMA_EXPORT_SCALE || '2';
const FORMAT = process.env.FIGMA_FORMAT || 'png';

if (!FIGMA_TOKEN) {
  console.error(' FIGMA_TOKEN not found in .env.local');
  process.exit(1);
}
async function figmaGet(endpoint) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API ${res.status}: ${text}`);
  }
  return res.json();
}
function collectNodes(node, result = []) {
  if (node.exportSettings?.length > 0) {
    result.push({ id: node.id, name: node.name, source: 'export-settings' });
  }
  if (node.children) {
    for (const child of node.children) collectNodes(child, result);
  }
  return result;
}
function safeName(name) {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9\-_\. ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}
async function main() {
  console.log(' Fetching Figma file tree...');
  const fileData = await figmaGet(`/files/${FILE_ID}`);

  const nodes = collectNodes(fileData.document);
  const unique = [...new Map(nodes.map((n) => [n.id, n])).values()];
  console.log(`   Found ${unique.length} exportable nodes`);

  if (unique.length === 0) {
    console.log('️  No nodes with export settings found.');
    console.log('   Tip: In Figma, select a frame -> right panel -> Export -> add + button');
    return;
  }

  const outDir = path.join(process.cwd(), 'public', 'assets');
  fs.mkdirSync(outDir, { recursive: true });
  const BATCH = 100;
  for (let i = 0; i < unique.length; i += BATCH) {
    const batch = unique.slice(i, i + BATCH);
    const ids = batch.map((n) => n.id).join(',');

    console.log(`\n️  Requesting export URLs (batch ${Math.floor(i / BATCH) + 1})...`);
    const imagesResp = await figmaGet(
      `/images/${FILE_ID}?ids=${ids}&format=${FORMAT}&scale=${SCALE}`
    );

    for (const node of batch) {
      const url = imagesResp.images[node.id];
      if (!url) {
        console.log(`   ️  No URL for "${node.name}"`);
        continue;
      }
      const nodeIndex = batch.indexOf(node);
      const baseName = safeName(node.name) || `node-${i + nodeIndex}`;
      const filename = `${baseName}-${node.id.replace(':', '-')}.${FORMAT}`;
      const dest = path.join(outDir, filename);
      process.stdout.write(`    ${filename} ... `);
      try {
        await download(url, dest);
        console.log('');
      } catch (e) {
        console.log(` ${e.message}`);
      }
    }
  }

  console.log(`\n Assets saved to public/assets/`);
}

main().catch((err) => {
  console.error('', err.message);
  process.exit(1);
});
