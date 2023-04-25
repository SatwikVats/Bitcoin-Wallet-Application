const { listWallets } = require('./listWallets');

const wallets = listWallets();
console.log('All wallets:', wallets);