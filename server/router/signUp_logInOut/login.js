const express = require('express');
require('date-utils');
const db = require("../../DB/db");
const router = express.Router();

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



    db.query('SELECT user_loginTime FROM user WHERE user_id =? OR user_password =?', 
        [user_id, user_password], function(err,results,fields){
            if(err) return res.status(400).send({status:"failed", message:"DB에러가 발생했습니다."});

            if(results.length <= 0) return res.status(400).send({status:"failed", message:"아이디, 비밀번호가 일치하지 않습니다."});

            req.session.user_id = db.user_id;
            req.session.user_nickname = db.user_nickname;
            req.session.save();

            let lastLoginTime = results[0].user_loginTime;
            console.log(lastLoginTime);
            if(!lastLoginTime){
                lastLoginTime = '0000-00-00';
            }
<<<<<<< HEAD
            const dbTime = lastLoginTime.split('-');
            console.log(dbTime);
            if (dbTime[0] != year && dbTime[1] != month && dbTime[2] != day){
                //첫번쨰 로그인
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
            
=======
        })


        if(year == dbTime_year && month == dbTime_month && day == dbTime_day){
            // 10 토큰 전송
            // 첫 로그인 마다 10토큰을 계정 지갑으로 전송
            return res.status(200).send({status:"success", message:"첫 로그인 10토큰 지급 완료"});
>>>>>>> c1fe84864ea111116c63d34a02a6c4d516dab1ab
        }
    );

    // console.log(year,month,day);

    // if(user_id == db.user_id && user_password == db.user_password){
    //     // db에 로그인 일자 업데이트 
    //     if(year == dbTime_year && month == dbTime_month && day == dbTime_day){
    //         // 10 토큰 전송
    //         return res.status(200).send({status:"success", message:"첫 로그인 10토큰 지급 완료"});
    //     }
    //     return res.status(200).send({status:"success", message: "로그인을 환영합니다."})
    // }
    // else{
    //     return res.status(400).send({status:"failed", message:"아이디, 비밀번호가 일치하지 않습니다."});
    // }
    
});
module.exports = router;