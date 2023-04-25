const { getBalance } = require('./getBalance');

const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter the wallet address:', (address) => {
    const balance = getBalance(address);
    console.log(balance);

});

//const balance = getBalance(wallet.address);

