const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../skills');
const destDir = path.resolve(__dirname, '../src/skills-data');

if (!fs.existsSync(srcDir)) {
  console.warn(`[copy-skills] skills dir not found: ${srcDir}`);
  process.exit(0);
}

fs.rmSync(destDir, { recursive: true, force: true });
fs.cpSync(srcDir, destDir, { recursive: true });

const folders = fs.readdirSync(destDir);
console.log(`[copy-skills] ✓ Copied ${folders.length} skill(s) → src/skills-data/`);
