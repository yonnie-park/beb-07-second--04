const express = require('express');
require('date-utils');

const router = express.Router();

const db = {user_id:"1", user_password:"2", user_loginTime:"2023-01-03"};

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

    const dbTime = user_loginTime.split('-');
    const dbTime_year = dbTime[0];
    const dbTime_month = dbTime[1];
    const dbTime_day = dbTime[2];

    console.log(year,month,day);

    if(user_id == db.user_id && user_password == db.user_password){
        
        
        if(year == dbTime_year && month == dbTime_month && day == dbTime_day){
            // 10 토큰 전송
        }
        res.status(200).send({status:"Success"})
    }
    
});
module.exports = router;