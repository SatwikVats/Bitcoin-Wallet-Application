const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const blockcypher = require('blockcypher');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const dotenv = require('dotenv');
dotenv.config();


async function getTransactions(address) {
    try {
      const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?token=${process.env.API_KEY}`);
      const transactions = response.data.txs.map((tx) => {
        return {
          txid: tx.hash,
          value: tx.outputs.reduce((total, output) => {
            if (output.addresses.includes(address)) {
              total += output.value;
            }
            return total;
          }, 0),
          confirmations: tx.confirmations,
        };
      });
      return transactions;
    } catch (error) {
      console.error(error);
    }
  }

module.exports = {
  getTransactions,
};
