const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');


async function importWallet(mnemonic) {
    const network = bitcoin.networks.testnet;
    const path = `m/44'/1'/0'/0`
  //const mnemonic = bip39.generateMnemonic();
  /*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });*/

  // Prompt user for the mnemonic phrase
  /*const mnemonic = await new Promise((resolve) => {
    rl.question('Enter your mnemonic phrase: ', (answer) => {
      resolve(answer.trim());
    });
  });*/


      const seed = bip39.mnemonicToSeedSync('Just a mnemonic');
      const root = bip32.fromSeed(seed, network);
  
      const account = root.derivePath(path);
      const node = account.derive(0).derive(0);
  
      const btcaddress = bitcoin.payments.p2pkh({
          pubkey: node.publicKey,
          network: network,
      }).address;
  
      console.log(
      `
      Wallet imported
      - Address: ${btcaddress},
      - Mnemonic: ${mnemonic}
      `
      );

      /*const wallets = JSON.parse(fs.readFileSync('./wallets.json', 'utf8'));
      wallets.push(response.data);
      fs.writeFileSync('./wallets.json', JSON.stringify(wallets));*/

      return { address: btcaddress, mnemonic: mnemonic };
}

module.exports = { importWallet };