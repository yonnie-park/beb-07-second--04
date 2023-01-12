const express = require('express');
require('date-utils');
const router = express.Router();
const db = require('../../DB/db');

const lightwallet = require("eth-lightwallet/");
const Web3 = require('web3');

const transfer_erc20 = require('../contract');

require('dotenv').config();
const { API_URL , erc20ContractAddr} = process.env;

const { erc20_ABI } = require('../../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

// const  = '0x8bc08122bEf2C3b1c06c61c9F9dFe023EF592A9e'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화


// 메인 게시판에는 사용자 사진,좋아요 전부 필요
router.get('/', (req, res)=>{
    let sql = 'SELECT * FROM post ORDER BY post_createdAt DESC LIMIT 10';
    db.query(sql, function(err,results,field){
        // console.log(results);
        if (err) throw err;
        res.status(200).send({status:"success", posts_list:results});
    })
})

// 업로드는 좋아요 X
router.post('/upload', async (req,res)=>{
    const {post_contents} = req.body;
    console.log(req.body);
    console.log(req.session);
    const newDate = new Date();
    const post_createdAt = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
    // console.log(time);
    const datas = [post_contents,req.session.user_nickname,post_createdAt];
    db.query('SELECT * FROM user WHERE user_id =? ',req.session.user_id, function(err,results,fields){
        console.log(results);
        const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
        // console.log(keystore);
        const address = keystore.getAddresses()[0];
        // console.log(server_address);
        let privateKey;
        // console.log(address);
        keystore.keyFromPassword(results[0].user_password, (err, data) => {

            const key = keystore.exportPrivateKey(address.toString(), data);

            privateKey = '0x' + key;
            console.log(privateKey);
            
            // erc20Contract.methods.balanceOf(address).call().then(console.log);
            erc20Contract.methods.balanceOf(address).call().then(e=>{
                if(e >= 1) {
                    const sql = "INSERT INTO post (post_contents,post_ID,post_createdAt, post_userImg, post_likes) VALUES(?,?,?,'img',0)";
                    db.query(sql, datas, function(err,rows){
                        if (err) {
                            console.error(err);
                            return res.status(400).send({status:"failed", message:"게시글 작성 실패 : "+ err});
                        }
                        else {
                            
                            res.status(200).send({status:"success", message:"게시글 작성 완료"});
                            db.query('SELECT * FROM user WHERE user_id = \'server\'',function(err,results){
                                // console.log(address, results[0].user_accountAddress);
                                return transfer_erc20(address, privateKey, results[0].user_accountAddress,1);
                            })
                            
                        }
                    })
                }
                else{
                    return res.status(400).send({status:"failed", message:"게시글 작성 실패 : 토큰이 부족합니다."});
                }
            })
        });
    })
    
    
})

router.post('/likes',(req,res)=>{
    const { post_num, user_id } = req.body;
    const sql = "Select * from post WHERE id = ?";
    db.query(sql,post_num,function(err,results){
        // console.log(results);
        if(err) console.log(err);
        const user_nickname = results[0].post_ID;
        const likes = results[0].post_likes + 1;
        db.query('SELECT * from likes WHERE user_id=? AND post_num=?',[user_id,post_num],function(err,results){
            if(err) console.log(err);
            // if(results.length > 0) return res.status(400).send({status:"failed", post_likes:likes-1, message:"이미 누른 좋아요 입니다."});
            else{
                db.query('INSERT INTO likes(user_id, post_num) VALUES (?,?)',[user_id,post_num],function(err,results){
                    if(err) {
                        console.log(err);
                    }
                    else{
                        db.query('UPDATE post SET post_likes=? WHERE id=?',[likes,post_num], function(err,results){
                            if(err) console.log(err);
                            if(likes % 10 == 0){
                                res.status(200).send({status:"success", post_likes:likes})
                                db.query('SELECT * FROM user WHERE user_id=\'server\'',function(err,results){
                                    // console.log(results);
                                    const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
                                    // console.log(keystore);
                                    const address = keystore.getAddresses()[0];
                                    // console.log(server_address);
                                    let privateKey;
                                    // console.log(address);
                                    keystore.keyFromPassword(results[0].user_password, (err, data) => {

                                        const key = keystore.exportPrivateKey(address.toString(), data);

                                        privateKey = '0x' + key;
                                        // console.log(privateKey);
                                        db.query('SELECT * FROM user WHERE user_id = ?',user_id,function(err,results){
                                            // console.log(results[0]);
                                            return transfer_erc20(address, privateKey, results[0].user_accountAddress,1);
                                        })
                                    });
                                })
                                
                            }
                            else{
                                return res.status(200).send({status:"success", post_likes:likes})
                            }
                        })
                    }
                });
            }
        })
    });
})


// async function transfer_erc20(address, privateKey,recieveAccount, amount) {
//     const gasPrice = await web3.eth.getGasPrice();
//     var txObj = {
//         nonce: web3.eth.getTransactionCount(address),
//         gasPrice: gasPrice,
//         gasLimit: 1000000,
//         to: erc20ContractAddr,
//         from: address,
//         value: '',
//         data: erc20Contract.methods.transfer(recieveAccount, `${amount}`).encodeABI(),
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(
//         txObj,
//         privateKey,
//     );
//     // console.log(txObj);
//     const transferResult = await web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//     );
//     // console.log(1, transferResult);

//     erc20Contract.methods.balanceOf(address).call().then(console.log);
// }

module.exports = router;