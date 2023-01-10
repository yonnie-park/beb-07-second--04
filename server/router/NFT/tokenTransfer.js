const express = require('express');
const router = express.Router();
const db = require("../../DB/db");
const Web3 = require('web3');
const lightwallet = require("eth-lightwallet/");

require('dotenv').config();
const { API_URL } = process.env;

const { erc20_ABI } = require('../../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

router.post('/',async (req,res)=>{
    const {sendToken_Address, id} = req.body; 
    
    // user_accountAddress를 위한 query
    // 서버계정과 User계정과 transfer 진행
    db.query('SELECT * FROM user WHERE user_accountAddress = ?',
    [user_accountAddress, user_keystore], function(err,results){
        const keystore = lightwallet.keystore.deserialize(results[0].user_keystore)
        // server_address 서버를 통해서 user에서 Token 전달
        const server_address = keystore.getAddresses()[0];
        let server_privateKey;
        // receive_account 받는 user의 account
        const receive_account = results[0].user_accountAddress

        // user_accountAddress 나
        if( typeof user_accountAddress ==='undefined' || 
            typeof server_address ==='undefined' ||
            typeof sendToken_Address === 'undefined'
            )
            return res.status(400).send({status: 'fail', message: 'Bad Request'});
        
        keystore.keyFromPassword(results[0].user_password, (err, data) => {
            const key = keystore.exportPrivateKey(server_address.toString(), data);
            server_privateKey = '0x' + key;

            async function transfer_erc20(server_address, server_privateKey,receive_account) {
                const gasPrice = await web3.eth.getGasPrice();
                // server_address가 갖고있는 eth
                const ethBalance = await web3.eth.getBalance(server_address);
                if(ethBalance < gasPrice) 
                return res.status(200).send({status:"fail", message: 'Not enough GAS'});
            }
        })
    })
})
module.exports = router;

