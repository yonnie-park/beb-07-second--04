const Web3 = require('web3');

require('dotenv').config();
const { API_URL } = process.env;

const { erc20_ABI } = require('../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

const erc20ContractAddr = '0x8bc08122bEf2C3b1c06c61c9F9dFe023EF592A9e'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화


const transfer_erc20 = async function (address, privateKey,recieveAccount, amount) {
    const gasPrice = await web3.eth.getGasPrice();
    // console.log(gasPrice);
    var txObj = {
        nonce: web3.eth.getTransactionCount(address),
        gasPrice: gasPrice,
        gasLimit: 1000000,
        to: erc20ContractAddr,
        from: address,
        value: '',
        data: erc20Contract.methods.transfer(recieveAccount, `${amount}`).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
        txObj,
        privateKey,
    );
    console.log(txObj);
    const transferResult = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
    );
    // console.log(1, transferResult);

    erc20Contract.methods.balanceOf(address).call().then(console.log);
    return transferResult;
}

module.exports = transfer_erc20;