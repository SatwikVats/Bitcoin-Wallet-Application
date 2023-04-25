const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc);
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const wallets_file = require('./wallets.json');

//Function to create a new wallet.
function createWallet() {
    const network = bitcoin.networks.testnet;
    const path = `m/44'/1'/0'/0`
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, network);

  const account = root.derivePath(path);
  const node = account.derive(0).derive(0);
  const privateKey = account.privateKey.toString('hex');

  //Get bitcoin address.
  const btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
  }).address;

  //Wallet data to be stored in Json file.
  const walletsFilePath = './wallets.json';
  const walletData = {
    mnemonic,
    btcAddress
  };

  let wallets = [];
  try {
    //const walletsJson = fs.readFileSync(wallets_file.join(''), 'utf-8');
    const walletsJson = fs.readFileSync(walletsFilePath);
    wallets = JSON.parse(walletsJson);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error reading wallets file:', error);
      return;
    }
  }

  wallets.push(walletData);

  try {
    fs.writeFileSync(walletsFilePath/*wallets_file.join('')*/, JSON.stringify(wallets/*, null, 2*/));
  } catch (error) {
    console.error('Error writing to wallets file:', error);
  }

  //Display data on the log.
  console.log(
    `
    Wallet generated
    - Address: ${btcAddress},
    - Key: ${node.toWIF()},
    - Mnemonic: ${mnemonic}
    `
  );
  
  //Store wallet data in a local file.
  /*const wallets = JSON.parse(fs.readFileSync('./wallets.json', 'utf8'));
  wallets.push(response.data);
  fs.writeFileSync('./wallets.json', JSON.stringify(wallets));*/

  return { address: btcAddress, key: node.toWIF(), mnemonic: mnemonic };
}


module.exports = { createWallet };