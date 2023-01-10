const express = require('express');
require('date-utils');
const db = require("../../DB/db");
const router = express.Router();
const lightwallet = require("eth-lightwallet/");
const Web3 = require('web3');

const { erc20_ABI } = require('../../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/0554b32c0e7245e1b1a36bd726defb9d')); //ganache provider

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

router.post('/', async(req, res)=>{
    const {user_id, user_password} = req.body;
    // console.log(req.body);
    const newDate = new Date();
    const time = newDate.toFormat('YYYY-MM-DD');
    // console.log(time);
    const timeSplit = time.split('-');
    const year = timeSplit[0];
    const month = timeSplit[1];
    const day = 11;

    db.query('SELECT * FROM user WHERE user_id = \'server\'', function(err,results){
        const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
        // console.log(keystore);
        const server_address = keystore.getAddresses()[0];
        // console.log(server_address);
        let server_privateKey;
        
        keystore.keyFromPassword(results[0].user_password, (err, data) => {

            const key = keystore.exportPrivateKey(server_address.toString(), data);

            server_privateKey = '0x' + key;
            console.log(server_privateKey);
            db.query('SELECT * FROM user WHERE user_id =? AND user_password =?', 
            [user_id, user_password], function(err,results,fields){
                if(err) return res.status(400).send({status:"failed", message:"DB에러가 발생했습니다."});

                if(results.length <= 0) return res.status(400).send({status:"failed", message:"아이디, 비밀번호가 일치하지 않습니다."});

                req.session.user_id = user_id;
                req.session.user_nickname = results[0].user_nickname;

                let lastLoginTime = results[0].user_loginTime;

                if(!lastLoginTime){
                    lastLoginTime = '0000-00-00';
                }
                const dbTime = lastLoginTime.split('-');
                const recieveAccount = results[0].user_accountAddress;
                
                erc20Contract.methods.balanceOf(server_address).call().then(console.log)
                console.log(dbTime, lastLoginTime, year,month,day);
                if (dbTime[0] != year || dbTime[1] != month || dbTime[2] != day){
                    
                    db.query('UPDATE user SET user_loginTime=? WHERE user_id = ?',[time,user_id], function(err, data){
                        if(err){
                            console.log(err);
                        }
                        res.status(200).send({status:"success", message:"첫 로그인 10토큰 지급"});
                        erc20Contract.methods.balanceOf(server_address).call().then(console.log)
                        return transfer_erc20(server_address,server_privateKey,recieveAccount);
                        // erc20Contract.methods.balanceOf(server_address).call().then(console.log)
                    })
                }
                else{
                    return res.status(200).send({status:"success", message: "로그인을 환영합니다."})
                }
                
            });
        });
    });


    async function transfer_erc20(server_address, server_privateKey,recieveAccount) {
        const gasPrice = await web3.eth.getGasPrice();
        var txObj = {
            nonce: web3.eth.getTransactionCount(server_address),
            gasPrice: gasPrice,
            gasLimit: 1000000,
            to: erc20ContractAddr,
            from: server_address,
            value: '',
            data: erc20Contract.methods.transfer(recieveAccount, '10').encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(
            txObj,
            server_privateKey,
        );
        console.log(txObj);
        const transferResult = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
        );
        console.log(1, transferResult);

        erc20Contract.methods.balanceOf(server_address).call().then(console.log)
    }
    
});
module.exports = router;