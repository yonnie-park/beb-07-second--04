const express = require('express');
const router = express.Router();
const db = require('../../DB/db');

router.get('/', async(req, res)=>{
    console.log(req.params);
    req.params("user_id");

    const{user_accountAddress,user_nickname,user_profileImg,
    post_likes,post_title,post_contents,post_createdAt,user_nfts} = req.body;

    // SQL문 user_id 기준에서 accountAddress nickname profileImg nfts 가져와야함
    // SQL문 post_id = user_id 같은 게시물 5개 
    // createdAt 시간 기준으로 likes title contents id(포스트넘버) 포함되어야함 
    // post_userImg == user_profileImg
});
module.exports = router;