const express = require('express');
const router = express.Router();
const db = require("../../DB/db");
const Web3 = require('web3');
const lightwallet = require("eth-lightwallet/");

require('dotenv').config();
const { API_URL , erc20ContractAddr} = process.env;
const transfer_erc20 = require('../contract')
const { erc20_ABI } = require('../../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

// const erc20ContractAddr = '0x8bc08122bEf2C3b1c06c61c9F9dFe023EF592A9e'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

router.post('/',async (req,res)=>{
    const {recipient, amount} = req.body;
    // user_accountAddress를 위한 query
    // 서버계정과 User계정과 transfer 진행
    db.query('SELECT * FROM user WHERE user_id = ? OR user_id = ?',
    [req.session.user_id, recipient], function(err,results){
        console.log(results[0]);
        const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
        const address = keystore.getAddresses()[0];
        let privateKey;
        // receive_account 받는 user의 account
        const recipient_address = results[1].user_accountAddress;
        
        erc20Contract.methods.balanceOf(address).call().then((e)=>{
            if (e < amount) {
                return res.status(400).send({ status: "failed", message: 'Not enough token' });
            }
            else {
                keystore.keyFromPassword(results[0].user_password, async (err, data) => {
                    const key = keystore.exportPrivateKey(address.toString(), data);
                    privateKey = '0x' + key;
        
                    await transfer_erc20(address, privateKey, recipient_address, amount);
                    return res.status(200).send({ status: "success", message: '토큰 전송 완료' });
                });
            }
        })
    })
})

module.exports = router;

