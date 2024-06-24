const { writeFile, readFile } = require("fs").promises;

const writer = async() => {
    try {
        await writeFile("./temporary/temp.txt", "The first line\n");
        await writeFile("./temporary/temp.txt", "The second line\n", {flag: "a"});
        await writeFile("./temporary/temp.txt", "The third line\n", {flag: "a"});
    } catch (error){
        console.log("Error wtiting to file: ", error);
    }
}

async function reader() {
    try {
        const file = await readFile("./temporary/temp.txt", "utf8");
        console.log(file);
    } catch(err){
        console.log(" Error reading from file: ", err);
    }
}
async function writeRead(){
    await writer();
    await reader();
}

writeRead();