// tail.js — show last N lines of file (like `tail`)
// usage: node tail.js <file> [n]
const fs = require('fs');

const filePath = process.argv[2];
const n = parseInt(process.argv[3], 10) || 10;

if (!filePath) {
  console.error('usage: node tail.js <file> [n]');
  process.exit(1);
}

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n');

console.log(lines.slice(-n).join('\n'));
