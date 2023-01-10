const express = require('express');
const router = express.Router();
const db = require("../../DB/db");
const Web3 = require('web3');

require('dotenv').config();
const { API_URL } = process.env;

const { erc20_ABI, erc721_ABI } = require('../../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

const erc721ContractAddr = ''; // ganache erc721 CA 
const erc721Contract = new web3.eth.Contract(erc721_ABI, erc721ContractAddr);



// ERC20 토큰으로 ERC721 NFT를 mint
router.post('/',async (req,res)=>{
    const {user_nfts, metadata, nft_imgURL} = req.body;

})
module.exports = router;