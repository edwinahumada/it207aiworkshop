// cat.js — print file contents to stdout
// usage: node cat.js <file>
const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('usage: node cat.js <file>');
  process.exit(1);
}

const data = fs.readFileSync(filePath, 'utf8');
console.log(data);
