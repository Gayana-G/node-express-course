const EventEmmiter = require("events");

const emitter = new EventEmmiter();
// setInterval(() => {
//     emitter.emit("timer", "hi there");
// }, 2000);
// emitter.on("timer", (msg) => console.log(msg));

const waitForEvent = () => {
    return new Promise((resolve) => {
        emitter.on("happens", (msg) => resolve(msg));
    })
};
const doWait = async () => {
    const msg = await waitForEvent();
    console.log("We got an event! it is: ", msg);
};
doWait();
emitter.emit("happens", "Hello World!");