const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    console.log(req.params);
    req.params("user_id");
});
module.exports = router;