const express = require('express');
const router = express.Router();
const db = require('../../DB/db');

router.post('/', async(req, res)=>{
    const {user_id} = req.body;
    let sql = 'SELECT * FROM user WHERE user_id = ?';
    db.query(sql, user_id, function(err,results){
        console.log(results);
        if (err) throw err;
        const {user_accountAddress, user_nickname, user_profileImg} = results[0];
        sql = 'SELECT * FROM post WHERE post_ID = ? ORDER BY post_createdAt DESC LIMIT 5';
        db.query(sql,user_nickname,function(err,results){
            if(err) {
                console.log(err);
                return res.status(400).send({status:"failed", message:err})
            }
            else{
                return res.status(200).send({status:"success", user_accountAddress, user_nickname, user_profileImg ,posts_list:results})
            }
        })
    })

    // SQL문 user_id 기준에서 accountAddress nickname profileImg nfts 가져와야함
    // SQL문 post_id = user_id 같은 게시물 5개 
    // createdAt 시간 기준으로 likes title contents id(포스트넘버) 포함되어야함 
    // post_userImg == user_profileImg 게시물 5개
});
module.exports = router;