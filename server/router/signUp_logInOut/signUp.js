const express = require('express');
const router = express.Router();
const db = {user_id:"1", user_password:"2", user_nickname:"3"};


router.post('/',async (req,res)=>{
    const {user_id,user_password,user_nickname} = req.body;
    console.log(user_id,user_password,user_nickname);

    //db에서 정보 검색해서
    // db.user_id, user_password, user_nickname 에 저장 or 검색해서 중복되는 결과가 있는지 확인

    if(db.user_id == user_id){
        res.status(406).send({status:"Failed", message:"id가 중복되어 있습니다."})
    }
    else if(db.user_nickname == user_nickname){
        res.status(406).send({status:"Failed", message:"닉넴임이 중복되어 있습니다."})
    }
    else{
        let mnemonic;              
        mnemonic = lightwallet.keystore.generateRandomSeed();
        lightwallet.keystore.createVault(
            {
                password: password,
                seedPhrase : mnemonic,
                hdPathString : "m/0'/0'/0'"
            },
            function(err,ks){
                ks.keyFromPassword(password, function(err, pwDerivedKey){
                    ks.generateNewAddress(pwDerivedKey, 1);

                    let address = (ks.getAddresses()).toString();
                    let keystore = ks.serialize();

                    fs.writeFile('wallet.json',keystore,function(err,data){
                        if(err){
                            console.log("지갑 생성 실패");
                        }
                        else{

                            //지갑 db에 저장하는 부분 구현 필요
                            console.log(keystore);
                            console.log("지갑 생성 성공");
                        }
                    })
                })
            }
        );
        res.status(200).send({status:"Success"});
    }
    
})

module.exports = router;