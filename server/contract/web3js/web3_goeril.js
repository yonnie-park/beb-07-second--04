const express = require('express');
const app = express();
const Web3 = require('web3');
const port = 8080;
require('dotenv').config();
const { API_URL, PRIVATE_KEY } = process.env;
const { erc20_ABI } = require('./ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //infura provider

const sendAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
const recieveAccount = '0x9205dc43b9f03e83cc57a9002ef06169ca41441b';

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A';

var erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

//transfer
async function transfer_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(sendAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: sendAccount.address,
    value: '',
    data: erc20Contract.methods.transfer(recieveAccount, '100').encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const transferResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(transferResult);
    return transferResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//transfer
app.get('/erc20/transfer', (req, res) => {
  transfer_erc20().then((result) => {
    res.send(result);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Server!');
});

app.listen(port, () => {
  console.log('Listening...');
});
