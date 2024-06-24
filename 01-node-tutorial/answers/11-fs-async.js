const { readFile, writeFile } = require("fs");

console.log("at start.");
writeFile("./temporary/fileB.txt", "this is my first line\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log(err);
    return;
  } else {
    writeFile(
      "./temporary/fileB.txt",
      "this is my second line\n",
      { flag: "a" },
      (err, result) => {
        console.log("at point 2");
        if (err) {
          console.log(err);
          return;
        } else {
          writeFile(
            "./temporary/fileB.txt",
            "this is my third line\n",
            { flag: "a" },
            (err, result) => {
              console.log("at point 3");
              if (err) {
                console.log(err);
                return;
              }
            }
          )
        }
      }
    );
  }
});
console.log("at end");
