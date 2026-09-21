// head.js — show first N lines of file (like `head`)
// usage: node head.js <file> [n]
const fs = require('fs');

const filePath = process.argv[2];
const n = parseInt(process.argv[3], 10) || 10;

if (!filePath) {
  console.error('usage: node head.js <file> [n]');
  process.exit(1);
}

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n');

console.log(lines.slice(0, n).join('\n'));
