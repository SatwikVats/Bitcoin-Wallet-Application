const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const blockcypher = require('blockcypher');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const dotenv = require('dotenv');
dotenv.config();

function generateAddress(mnemonic) {
    const network = bitcoin.networks.testnet;
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const node = bip32.fromSeed(seed, network);
    const { address } = bitcoin.payments.p2pkh({ pubkey: node.publicKey });
    return address;
}

module.exports = {
    generateAddress
};