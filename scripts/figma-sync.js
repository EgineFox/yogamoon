
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

const run = (label, cmd) => {
  console.log(`\n${'─'.repeat(50)}`);
  console.log(` ${label}`);
  console.log('─'.repeat(50));
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(` Step failed: ${label}: ${e.message}`);
  }
};

console.log('\n Yogamoon - Figma Sync\n');
run('Step 1 / 2 - Design tokens (colors, typography)', 'node scripts/figma-tokens.js');
run('Step 2 / 2 - Export images', 'node scripts/figma-images.js');
console.log('\n Sync complete!\n');
