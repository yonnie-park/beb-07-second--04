const express = require('express');
require('date-utils');
const db = require("../../DB/db");
const router = express.Router();
const lightwallet = require("eth-lightwallet/");
const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');


const { erc20_ABI } = require('../../contract/web3js/ABI');

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A'; //ganache erc20 CA

// const db = {user_id:"1", user_password:"2", user_nickname:"3", user_loginTime:"2023-01-03"};

router.post('/', async(req, res)=>{
    const {user_id, user_password} = req.body;
    // console.log(req.body);
    const newDate = new Date();
    const time = newDate.toFormat('YYYY-MM-DD');
    // console.log(time);
    const timeSplit = time.split('-');
    const year = timeSplit[0];
    const month = timeSplit[1];
    const day = timeSplit[2];

    let server_provider;
    let server_privateKey;

    let erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화
    
    db.query('SELECT * FROM user WHERE user_id = \'server\'', function(err,results){
        console.log(results);
        const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
        const address = keystore.getAddresses();

        console.log(keystore);
        console.log(address);
        
        
        keystore.keyFromPassword(results[0].user_password, (err, data) => {

            const key = keystore.exportPrivateKey(address.toString(), data);
    
            server_privateKey = '0x' + key;
        });

        server_provider = new SignerProvider('https://goerli.infura.io/v3/0554b32c0e7245e1b1a36bd726defb9d', {
            signTransaction: (rawTx, cb) => cb(null, sign(rawTx, server_privateKey.toString())),
            accounts: (cb) => cb(null, [address.toString()]),
        });

    });


    db.query('SELECT * FROM user WHERE user_id =? AND user_password =?', 
        [user_id, user_password], function(err,results,fields){
            if(err) return res.status(400).send({status:"failed", message:"DB에러가 발생했습니다."});

            if(results.length <= 0) return res.status(400).send({status:"failed", message:"아이디, 비밀번호가 일치하지 않습니다."});

            req.session.user_id = user_id;
            req.session.user_nickname = results[0].user_nickname;

            console.log(req.session);
            console.log(results);
            let lastLoginTime = results[0].user_loginTime;
            // console.log(lastLoginTime);
            if(!lastLoginTime){
                lastLoginTime = '0000-00-00';
            }
            const dbTime = lastLoginTime.split('-');
            console.log(dbTime);

            const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
            const address = keystore.getAddresses();

            console.log(keystore);
            console.log(address);
            let privateKey;

            keystore.keyFromPassword(results[0].user_password, (err, data) => {

                const key = keystore.exportPrivateKey(address.toString(), data)
        
                privateKey = '0x' + key
                console.log(privateKey);
            });

            const provider = new SignerProvider('https://goerli.infura.io/v3/0554b32c0e7245e1b1a36bd726defb9d', {
                signTransaction: (rawTx, cb) => cb(null, sign(rawTx, privateKey.toString())),
                accounts: (cb) => cb(null, [address.toString()]),
            });


            console.log(provider);
            if (dbTime[0] != year && dbTime[1] != month && dbTime[2] != day){
                //첫번쨰 로그인
                // token 전송기능
                db.query('UPDATE user SET user_loginTime=? WHERE user_id = ?',[time,user_id], function(err, data){
                    if(err){
                        console.log(err);
                    }
                    return res.status(200).send({status:"success", message:"첫 로그인 10토큰 지급 완료"});
                })
            }
            else{
                return res.status(200).send({status:"success", message: "로그인을 환영합니다."})
            }
            
        }
    );
    
});
module.exports = router;