const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');
const blockcypher = require('blockcypher');
const db = require('db');
const dotenv = require('dotenv');
dotenv.config();

const { createWallet } = require('./createWallet');
const { importWallet } = require('./importWallet');
const { listWallets } = require('./listWallets');
const { getBalance } = require('./getBalance');
const { getTransactions } = require('./getTransactions');
const { generateAddress } = require('./generateAddress');

const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

// Creating a new wallet
const wallet = createWallet();
console.log(wallet);

//Creating a wallet with mnemonic given by the user.
const importedWallet = importWallet('Random mnemonic');
console.log(importedWallet);

//Listing all wallets stored locally.
const wallets = listWallets();
console.log('All wallets:', wallets);

//Getting balance in a wallet with a given address
const balance = getBalance(wallet.address);
console.log(balance);

//Getting transaction details of a wallet with a given address
const transactions = getTransactions(wallet.address);
console.log(transactions);

//Generating an unused bitcoin address for a wallet.
const newAddress = generateAddress(wallet.mnemonic);
console.log(newAddress);

