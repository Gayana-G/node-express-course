const names = require('./04-names');
const greeting = require('./05-utils');
const altFlavor = require('./06-alternative-flavor');
require('./07-mind-grenade');

console.log(names);
greeting(names.john);
console.log(altFlavor.weekDays[0]);
