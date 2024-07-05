const { createReadStream } = require("fs");

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 200 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream("../content/big.txt", {
  highWaterMark: 200,
  encoding: "utf8",
});

let chunkCount = 0;
let reminder = "";

//handle the "data" event
stream.on("data", (chunk) => {
    chunkCount++;
    //Concate the remander from the last chunk with the current chunk
    let data = reminder + chunk;
    //split the data by new lines to handle line boundaries
    const lines = data.split("\n");
    //in case the last element is incomplete line
    reminder = lines.pop();

  lines.forEach((line) => console.log("received chunk: ", line));
});

//handle "end" event
stream.on("end", () => {
    if(reminder){
        console.log("received chunk: ", reminder);
    }
    console.log("Stream ended. Total chunks received: ", chunkCount);
})
stream.on("error", (err) => console.log("An error occurred: ", err));
