const os = require('os');

//info about current user info
const user = os.userInfo();

//method returns the system uptime in sec
console.log(`The Sytem Uptime is ${os.uptime} seconds`);

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS);
