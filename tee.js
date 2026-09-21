// tee.js — read stdin, write to file and console (like `tee`)
// usage: echo "hello" | node tee.js <file>
const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('usage: node tee.js <file>');
  process.exit(1);
}

const input = fs.readFileSync(0, 'utf8'); // fd 0 = stdin
fs.writeFileSync(filePath, input);
process.stdout.write(input);
