const express = require('express');
require('date-utils');

const router = express.Router();

// const db = {user_id:"1", user_password:"2", user_nickname:"3", user_loginTime:"2023-01-03"};
const db = require("../../DB/db");

router.post('/', async(req, res)=>{
    const {user_id, user_password} = req.body;
    console.log(req.body);
    const newDate = new Date();
    const time = newDate.toFormat('YYYY-MM-DD');
    console.log(time);
    const timeSplit = time.split('-');
    const year = timeSplit[0];
    const month = timeSplit[1];
    const day = timeSplit[2];

    const dbTime = db.user_loginTime.split('-');
    const dbTime_year = dbTime[0];
    const dbTime_month = dbTime[1];
    const dbTime_day = dbTime[2];

    console.log(year,month,day);

    if(user_id == db.user_id && user_password == db.user_password){
        req.session.user_id = db.user_id;
        req.session.user_nickname = db.user_nickname;
        req.session.save();

        // db에 로그인 일자 업데이트 
        db.query('INSERT INTO user (user_loginTime VALUES(?)',[user_loginTime], function(err, data){
            if(err){
                console.log(err);
            }
        })


        if(year == dbTime_year && month == dbTime_month && day == dbTime_day){
            // 10 토큰 전송
            return res.status(200).send({status:"success", message:"첫 로그인 10토큰 지급 완료"});
        }
        return res.status(200).send({status:"success", message: "로그인을 환영합니다."})
    }
    else{
        return res.status(400).send({status:"failed", message:"아이디, 비밀번호가 일치하지 않습니다."});
    }
    
});
module.exports = router;