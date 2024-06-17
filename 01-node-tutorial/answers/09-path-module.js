const path = require('path');
//to check the separatoe sign
console.log(path.sep);

const filePath = path.join('temporary', '/content', 'subfolder', 'test.txt');
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const absolute = path.resolve(__dirname, 'temporary', 'content', 'subfolder', 'test.txt');
console.log(absolute);