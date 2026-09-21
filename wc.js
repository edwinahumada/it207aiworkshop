// wc.js — count lines, words, chars in file (like `wc`)
// usage: node wc.js <file>
const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('usage: node wc.js <file>');
  process.exit(1);
}

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n').filter((_, i, arr) => i < arr.length - 1 || arr[i] !== '').length;
const words = data.split(/\s+/).filter(Boolean).length;
const chars = data.length;

console.log(`${lines} ${words} ${chars} ${filePath}`);
