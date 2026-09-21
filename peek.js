// peek.js — show first N and last N lines, skip the middle (combines head + tail)
// usage: node peek.js <file> [n]
const fs = require('fs');

const filePath = process.argv[2];
const parsed = parseInt(process.argv[3], 10);
const n = isNaN(parsed) ? 3 : parsed;

if (!filePath) {
  console.error('usage: node peek.js <file> [n]');
  process.exit(1);
}

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.trimEnd().split('\n');

if (lines.length <= 2 * n) {
  console.log(lines.join('\n'));
} else {
  if (n > 0) console.log(lines.slice(0, n).join('\n'));
  console.log('...');
  if (n > 0) console.log(lines.slice(-n).join('\n'));
}
