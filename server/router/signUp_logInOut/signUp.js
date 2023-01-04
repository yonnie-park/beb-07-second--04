const express = require('express');
const router = express.Router();
// const db = {user_id:"1", user_password:"2", user_nickname:"3"};
// const user = require("../../DB/Entity/user"); // user DB
const db = require("../../DB/db");
const lightwallet = require("eth-lightwallet/");
const fs = require('fs');



router.post('/',async (req,res)=>{
    const {user_id,user_password,user_nickname} = req.body;
    console.log(user_id,user_password,user_nickname);


    //db에서 정보 검색해서
    // db.user_id, user_password, user_nickname 에 저장 or 검색해서 중복되는 결과가 있는지 확인
    
    if (user_id && user_password && user_nickname) {
        try{
            db.query('SELECT * FROM user WHERE user_id =? OR user_nickname =?', 
            [user_id, user_nickname], function(err,results){ // 중복 확인
                console.log(err, results);
                if(err) throw err;
                if(results.length <=0 && user_password) {
                    console.log(results);
                    db.query('INSERT INTO user (user_id, user_password, user_nickname) VALUES(?,?,?)', 
                    [user_id,user_password,user_nickname], function(err,data){
                        if(err) throw err;
                        res.send("회원가입이 완료되었습니다")
                    } 
                )} else {
                    res.status(200).send({data:results, message: "이미 사용중인 ID입니다"})
                }
            })
        } catch(err){
            console.log(err);
        }
        
    }

    if(db.user_id == user_id){
         return res.status(406).send({status:"failed", message:"중복된 ID 입니다"})
    }
    else if(db.user_nickname == user_nickname){
        return res.status(406).send({status:"failed", message:"중복된 닉네임 입니다"})
    }
    else{
        let mnemonic;              
        mnemonic = lightwallet.keystore.generateRandomSeed();
        lightwallet.keystore.createVault(
            {
                password: user_password,
                seedPhrase : mnemonic,
                hdPathString : "m/0'/0'/0'"
            },
            function(err,ks){
                ks.keyFromPassword(user_password, function(err, pwDerivedKey){
                    ks.generateNewAddress(pwDerivedKey, 1);

                    let address = (ks.getAddresses()).toString();
                    let keystore = ks.serialize();

                    fs.writeFile('wallet.json',keystore,function(err,data){
                        if(err){
                            console.log("지갑 생성 실패");
                        }
                        // else{

                        //     //지갑 db에 저장하는 부분 구현 필요
                        //     // const {user_accountAddress} = req.body;
                        //     // const params = [keystore];
                        //     // console.log(user_accountAddress);

                        //     // if(db.user_accountAddress) {
                        //     //     db.query('INSER INTO user (user_accountAddress) VALUES (?)',),
                        //     //     [user_accountAddress],params, function(err,data) {
                        //     //         if(err) throw err;
                        //     //         res.send('지갑 생성 성공')
                        //     //     }
                        //     // }
                        //     // console.log(keystore);
                        //     // console.log("지갑 생성 성공");
                        // }
                    })
                })
            }
        );
        res.status(200).send({status:"success"});
    }
    
})

module.exports = router;