const { writeFile, readFile } = require("fs");

writeFile("./temporary/temp.txt", "The first line with then\n")
.then(() => {
    return writeFile("./temporary/temp.txt", "The second line with then\n", {flag: "a"})
})
.then (() => {
    return writeFile("./temporary/temp.txt", "The third line with then\n", {flag: "a"})
})
.then(() => {
    return readFile("./temporary/temp.txt", "utf8")
})
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log("An error occurred: ", err);
})