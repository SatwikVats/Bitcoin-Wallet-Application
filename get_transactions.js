const { getTransactions } = require('./getTransactions');

const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter the wallet address:', (address) => {
    const transactions = getTransactions(address);
    console.log(transactions);
});