const Web3 = require('web3');

require('dotenv').config();
const { API_URL } = process.env;

const { erc20_ABI } = require('../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A'; //ganache erc20 CA
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
}

module.exports = transfer_erc20;