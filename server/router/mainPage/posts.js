const express = require('express');
require('date-utils');
const router = express.Router();
const db = require('../../DB/db');


// 메인 게시판에는 사용자 사진,좋아요 전부 필요
router.get('/', async(req, res)=>{
    let sql = 'SELECT * FROM post ORDER BY post_createdAt DESC LIMIT 10';
    db.query(sql, function(err,results,field){
        console.log(results);
        if (err) throw err;
        res.status(200).send({status:"success", posts_list:results});
    })
})

// 업로드는 좋아요 X
router.post('/upload',async (req,res)=>{
    const {post_title,post_contents} = req.body;
    console.log(req.body);
    console.log(req.session);
    const newDate = new Date();
    const post_createdAt = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
    // console.log(time);
    const datas = [post_title,post_contents,req.session.user_nickname,post_createdAt];

    const sql = "INSERT INTO post (post_title,post_contents,post_ID,post_createdAt, post_userImg, post_likes) VALUES(?,?,?,?,'img',0)";
    db.query(sql, datas, function(err,rows){
        if (err) {
            console.error(err);
            return res.status(400).send({status:"failed", message:"게시글 작성 실패 : + err"});
        }

        // 현재 가지고 있는 토큰 갯수 검사

        //충분할 경우
        else res.status(200).send({status:"success", message:"게시글 작성 완료"});
    })
})
module.exports = router;