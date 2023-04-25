const { generateAddress } = require('./generateAddress');

const newAddress = generateAddress('New unused address is generated');
console.log(`Newly generated address: ${newAddress}`);