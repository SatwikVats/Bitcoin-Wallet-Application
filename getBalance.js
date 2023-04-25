const axios = require('axios');
const blockcypher = require('blockcypher');
const dotenv = require('dotenv');
dotenv.config();

async function getBalance(address) {
    try {
      //const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance?token=${process.env.API_KEY}`);
      const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'btc_wallet',
        'Accept': 'application/json',
        'token': process.env.API_KEY
      }
    });
      //console.log(response.data.final_balance);
      console.log(`Wallet balance for address ${address}: ${response.data.final_balance}`);
      return response.data.final_balance;
    } catch (error) {
      console.error(error);
    }
  }

module.exports = {
  getBalance
};


/*function getBalance(address) {
  const url = `https://blockchain.info/rawaddr/${address}`;
  return axios.get(url)
    .then(response => response.data.final_balance)
    .catch(error => console.log(error));
}*/