const express = require('express');
const router = express.Router();


router.get('/', async(req, res)=>{
    console.log("로그아웃",req.session);
    req.session.destroy();
    console.log("로그아웃 후", req.session);
    res.status(200).send({status:"Success", message:"로그아웃 성공"});
});
module.exports = router;