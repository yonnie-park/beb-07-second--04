const express = require('express');
const router = express.Router();

const posts = require('./mainPage/posts');
const mypage = require('./mypage/mypage');
const makeNFT = require('./NFT/makeNFT');
const tokenTransfer = require('./NFT/tokenTransfer');
const login = require('./signUp_loginOut/login');
const logout = require('./signUp_logInOut/logout');
const signUp = require('./signUp_logInOut/signUp');

router.get('/', (req, res) => {
  console.log('hello');
  res.send('hello');
});

router.use('/posts', posts);
router.use('/signUp', signUp);
router.use('/login', login);
router.use('/logout', logout);
router.use('/mypage', mypage);
router.use('/tokenTransfer', tokenTransfer);
router.use('/makeNFT', makeNFT);


module.exports = router;
