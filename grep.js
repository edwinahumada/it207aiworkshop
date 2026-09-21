// grep.js — print lines containing a word (simplified `grep`)
// usage: node grep.js <word> <file>
const fs = require('fs');

const word = process.argv[2];
const filePath = process.argv[3];

if (!word || !filePath) {
  console.error('usage: node grep.js <word> <file>');
  process.exit(1);
}

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n');

lines.filter(line => line.includes(word)).forEach(line => console.log(line));
