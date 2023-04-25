const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const wallets_file = require('./wallets.json');


async function listWallets() {
    try {
        const walletsFilePath = './wallets.json';
        const walletsData = fs.readFileSync(walletsFilePath);
        const wallets = JSON.parse(walletsData);
        console.log('All wallets:', wallets);
      } catch (error) {
        console.error(`Error reading wallets file: ${error}`);
      }
}


module.exports = { listWallets };


/*const createWallet = async () => {
  try {
    const response = await axios.post(
      `https://api.blockcypher.com/v1/btc/main/wallets?token=${process.env.API_KEY}`
    );

    const newWallet = {
      name: response.data.name,
      address: response.data.address,
      private: response.data.private,
      public: response.data.public,
    };

    const wallets = JSON.parse(fs.readFileSync("./wallets.json"));

    wallets.push(newWallet);

    fs.writeFileSync("./wallets.json", JSON.stringify(wallets));

    console.log("Wallet created successfully.");
  } catch (error) {
    console.error(error.message);
  }
};*/




  
  


/*function createWallet() {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  return {
    mnemonic: null,
    privateKey: keyPair.toWIF(),
    address,
  };
}*/


/*function importWallet(mnemonic) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const keypair = bitcoin.ECPair.fromWIF(node.toWIF());
  const { address } = bitcoin.payments.p2pkh({ pubkey: keypair.publicKey });
  return {
    mnemonic,
    address
  };
}*/

/*function importWallet(privateKey) {
    const network = bitcoin.networks.testnet;
    const keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: network,
    });
  
    console.log(`Wallet imported - Address: ${address}, Key: ${privateKey}`);
  }*/



/*function importWallet(privateKey) {
  const keyPair = bitcoin.ECPair.fromWIF(privateKey);
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  return {
    mnemonic: null,
    privateKey,
    address,
  };
}*/

