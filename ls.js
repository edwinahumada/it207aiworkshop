// ls.js — list directory contents (like `ls`)
// usage: node ls.js [dir]
const fs = require('fs');

const dirPath = process.argv[2] || '.';
const entries = fs.readdirSync(dirPath);

entries.forEach(name => console.log(name));
