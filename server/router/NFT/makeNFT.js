const express = require('express');
const router = express.Router();
const db = require("../../DB/db");
const lightwallet = require("eth-lightwallet/");
const Web3 = require('web3');

require('dotenv').config();
const { API_URL } = process.env;

const { erc20_ABI, erc721_ABI } = require('../../contract/web3js/ABI');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //ganache provider

const erc20ContractAddr = '0xe9FA229F8737f43BaBF747fBf76D821fB7Cb9a1A'; //ganache erc20 CA
const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

const erc721ContractAddr = '0xb7D1AA1aDC463fD7c258819fe90464D3Be32d2C2'; // ganache erc721 CA 
const erc721Contract = new web3.eth.Contract(erc721_ABI, erc721ContractAddr);

// ERC20 토큰으로 ERC721 NFT를 mint
router.post('/',async (req,res)=>{
    const {nft_name, nft_imgURL} = req.body;
    const tempImg = 'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/test.json';

    req.session.user_id = 'server';
    const user_id = req.session.user_id;
    db.query('INSERT INTO nft (user_nfts,metadata , nft_imgURL) VALUES (?,?,?)',[user_id,nft_name,tempImg],function(err,results){
        if(err){
            console.log(err);
            return res.status(400).send({status:"failed", message:"img 업로드 실패"});
        }

        db.query('SELECT * FROM user WHERE user_id = ?',user_id,function(err,results){
            // console.log(results);
            const keystore = lightwallet.keystore.deserialize(results[0].user_keystore);
            // console.log(keystore);
            const address = keystore.getAddresses()[0];
            // console.log(server_address);
            let privateKey;
            // console.log(address);
            keystore.keyFromPassword(results[0].user_password, (err, data) => {
    
                const key = keystore.exportPrivateKey(address.toString(), data);
    
                privateKey = '0x' + key;
                // console.log(privateKey);
                res.status(200).send({status:"success", message:"img 업로드 성공"});
                erc20Contract.methods.allowance(address, erc721ContractAddr).call().then(console.log);
                return mintNFT_erc721(address, privateKey, tempImg);
            });
        })
    });
})

async function approve_erc20(address, privateKey) {
    var txObj = {
      nonce: web3.eth.getTransactionCount(address),
      gasPrice: web3.eth.gasPrice,
      gasLimit: 1000000,
      to: erc20ContractAddr,
      from: address,
      value: '',
      data: erc20Contract.methods.approve(erc721ContractAddr, '100').encodeABI(),
    };
  
    try {
      const signedTx = await web3.eth.accounts.signTransaction(
        txObj,
        privateKey,
      );
      const approveResult = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
  
      console.log(approveResult);
      return approveResult;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

async function mintNFT_erc721(address, privateKey, imgURL) {
    erc20Contract.methods.allowance(address, erc721ContractAddr).call().then(console.log);
    await approve_erc20(address,privateKey);
    erc20Contract.methods.allowance(address, erc721ContractAddr).call().then(console.log);
    var txObj = {
      nonce: web3.eth.getTransactionCount(address),
      gasPrice: web3.eth.gasPrice,
      gasLimit: 1000000,
      to: erc721ContractAddr,
      from: address,
      value: '',
      data: erc721Contract.methods
        .mintNFT(
            address,
          imgURL,
        )
        .encodeABI(),
    };
  
    try {
      const signedTx = await web3.eth.accounts.signTransaction(
        txObj,
        privateKey,
      );
      const mintNFTResult = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
  
      console.log(mintNFTResult);
      return mintNFTResult;
    } catch (e) {
      console.log(e);
      return e;
    }
}

module.exports = router;