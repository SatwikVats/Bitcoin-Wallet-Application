const { importWallet } = require('./importWallet');

const importedWallet = importWallet('Random mnemonic');
console.log(importedWallet);