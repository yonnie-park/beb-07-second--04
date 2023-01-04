const express = require('express');
const router = express.Router();
// const db = {user_id:"1", user_password:"2", user_nickname:"3"};
// const user = require("../../DB/Entity/user"); // user DB
const db = require("../../DB/db");
const lightwallet = require("eth-lightwallet/");
const fs = require('fs');
const { resourceLimits } = require('worker_threads');



router.post('/',async (req,res)=>{
    const {user_id,user_password,user_nickname} = req.body;
    console.log(user_id,user_password,user_nickname);


    //db에서 정보 검색해서
    // db.user_id, user_password, user_nickname 에 저장 or 검색해서 중복되는 결과가 있는지 확인
    console.log(typeof(user_id),typeof(user_nickname));

    db.query('SELECT * FROM user WHERE user_id =? OR user_nickname =?', 
        [user_id, user_nickname], function(err,results,fields){ // 중복 확인
        console.log(err, results);
        if(results.length > 0){
            res.status(406).send({status:"failed", message:"id 또는 닉네임이 중복 입니다"})
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
                        
                        db.query('INSERT INTO user (user_id, user_password, user_nickname,user_accountAddress,user_keystore) VALUES(?,?,?,?,?)', 
                            [user_id,user_password,user_nickname,address,keystore], function(err,data){
                                if(err) {
                                    console.log(err);
                                    res.status(400).send({status:"failed", message:"회원가입에 실패했습니다."});
                                }
                                else res.status(200).send({status:"success", message:"회원가입에 성공했습니다."})
                            }
                        );
                    })
                }
            );
        }
    })
})

module.exports = router;