const { readFileSync, writeFileSync } = require("fs");
// const fs = require('fs');
// fs.readFileSync()

const first = readFileSync("./temporary/content/first.txt", "utf8");
const second = readFileSync("./temporary/content/second.txt", "utf8");

writeFileSync(
  "./temporary/fileA.txt",
  "This is my first line\n",
);

writeFileSync(
  "./temporary/fileA.txt",
  "This is my second line\n",
  { flag: "a" } // flag a means node will append new text instead of overwriting it
);

writeFileSync(
  "./temporary/fileA.txt",
  "This is my third line\n",
  { flag: "a" } // flag a means node will append new text instead of overwriting it
);

console.log(first, second);
