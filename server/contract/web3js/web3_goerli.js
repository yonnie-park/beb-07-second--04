const express = require('express');
const app = express();
const Web3 = require('web3');
const port = 8080;
const { erc20_ABI, erc721_ABI } = require('./ABI');
require('dotenv').config();
const { API_URL, PRIVATE_KEY, PRIVATE_KEY_1, PRIVATE_KEY_2 } = process.env;

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL)); //infura provider

const ownerAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY); //배포계정
const user1Account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY_1); //서버계정
const user2Account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY_2); //유저계정

const beomAccount = '0x9205dc43b9f03e83cc57a9002ef06169ca41441b';

const erc20ContractAddr = '0x8bc08122bEf2C3b1c06c61c9F9dFe023EF592A9e'; //goerli erc20 CA
const erc721ContractAddr = '0x8e2F396270567e1820e6eBD0e9774D68e8D8c899'; //goerli erc721 CA

var erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화
var erc721Contract = new web3.eth.Contract(erc721_ABI, erc721ContractAddr); //erc721 contract 인스턴스화

//createAccounts
async function createAccount() {
  try {
    const createAccountResult = await web3.eth.accounts.create();

    console.log(createAccountResult);
    return createAccountResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//accounts
async function getAccount() {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log(accounts);
    return accounts;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//approve
async function approve_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(user2Account.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: user2Account.address,
    value: '',
    data: erc20Contract.methods.approve(erc721ContractAddr, '100').encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY_2,
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

//allowance
async function allowance_erc20() {
  try {
    const allowanceResult = await erc20Contract.methods
      .allowance(user2Account.address, erc721ContractAddr)
      .call();

    console.log(allowanceResult);
    return allowanceResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//transferFrom
async function transferFrom_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods
      .transferFrom(ownerAccount.address, user1Account.address, '100')
      .encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const transferFromResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(transferFromResult);
    return transferFromResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//transfer
async function transfer_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods.transfer(beomAccount, '3000').encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const transferResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(transferResult);
    return transferResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//balanceOf
async function balanceOf_erc20() {
  try {
    const ethBalanceResult = await web3.eth.getBalance(user1Account.address);

    const balanceOfResult = await erc20Contract.methods
      .balanceOf(user1Account.address)
      .call();

    console.log(balanceOfResult);
    console.log(ethBalanceResult / 1000000000000000000);
    return balanceOfResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//isTokenLock
async function isTokenLock_erc20() {
  try {
    const checkLockResult = await erc20Contract.methods
      .isTokenLock(user1Account.address, user2Account.address)
      .call();

    console.log(checkLockResult);
    return checkLockResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//removeTokenLock
async function removeTokenLock_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods.removeTokenLock().encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const removeAllResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(removeAllResult);
    return removeAllResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//removePersonalTokenLock
async function removePersonalTokenLock_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods
      .removePersonalTokenLock(user1Account.address)
      .encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const removePersonalResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(removePersonalResult);
    return removePersonalResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//assignTokenLock
async function assignTokenLock_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods.assignTokenLock().encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const assignAllResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(assignAllResult);
    return assignAllResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//assignPersonalTokenLock
async function assignPersonalTokenLock_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods
      .assignPersonalTokenLock(user1Account.address)
      .encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const assignPersonalResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(assignPersonalResult);
    return assignPersonalResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//transferOwnership
async function transferOwnership_erc20() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc20ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc20Contract.methods
      .transferOwnership(user1Account.address)
      .encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const giveOwnerResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(giveOwnerResult);
    return giveOwnerResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//owner
async function owner_erc20() {
  try {
    const ownerResult = await erc20Contract.methods.owner().call();

    console.log(ownerResult);
    return ownerResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//getPendingTransactions
app.get('/erc20/getPendingTransactions', (req, res) => {
  getPendingTransactions().then((result) => {
    res.send(result);
  });
});

//createAccounts
app.get('/erc20/createAccounts', (req, res) => {
  createAccount().then((result) => {
    res.send(result);
  });
});

//accounts
app.get('/erc20/accounts', (req, res) => {
  getAccount().then((result) => {
    res.send(result);
  });
});

//approve
app.get('/erc20/approve', (req, res) => {
  approve_erc20().then((result) => {
    res.send(result);
  });
});

//allowance
app.get('/erc20/allowance', (req, res) => {
  allowance_erc20().then((result) => {
    res.send(result);
  });
});

//transferFrom
app.get('/erc20/transferFrom', (req, res) => {
  transferFrom_erc20().then((result) => {
    res.send(result);
  });
});

//transfer
app.get('/erc20/transfer', (req, res) => {
  transfer_erc20().then((result) => {
    res.send(result);
  });
});

//balanceOf
app.get('/erc20/balanceOf', (req, res) => {
  balanceOf_erc20().then((result) => {
    res.send(result);
  });
});

//isTokenLock
app.get('/erc20/isTokenLock', (req, res) => {
  isTokenLock_erc20().then((result) => {
    res.send(result);
  });
});

//removeTokenLock
app.get('/erc20/removeTokenLock', (req, res) => {
  removeTokenLock_erc20().then((result) => {
    res.send(result);
  });
});

//removePersonalTokenLock
app.get('/erc20/removePersonalTokenLock', (req, res) => {
  removePersonalTokenLock_erc20().then((result) => {
    res.send(result);
  });
});

//assignTokenLock
app.get('/erc20/assignTokenLock', (req, res) => {
  assignTokenLock_erc20().then((result) => {
    res.send(result);
  });
});

//assignPersonalTokenLock
app.get('/erc20/assignPersonalTokenLock', (req, res) => {
  assignPersonalTokenLock_erc20().then((result) => {
    res.send(result);
  });
});

//transferOwnership
app.get('/erc20/transferOwnership', (req, res) => {
  transferOwnership_erc20().then((result) => {
    res.send(result);
  });
});

//owner
app.get('/erc20/owner', (req, res) => {
  owner_erc20().then((result) => {
    res.send(result);
  });
});

//balanceOf
async function balanceOf_erc721() {
  try {
    const balanceOfResult = await erc721Contract.methods
      .balanceOf(user1Account.address)
      .call();

    console.log(balanceOfResult);
    return balanceOfResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//approve
async function approve_erc721() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc721ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc721Contract.methods.approve(user1Account.address, '1').encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
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

//getApproved
async function getApprove_erc721() {
  try {
    const getApprovedResult = await erc721Contract.methods
      .getApproved('1')
      .call();

    console.log(getApprovedResult);
    return getApprovedResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//safeTransferFrom(transferFrom)
async function safeTransferFrom_erc721() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc721ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc721Contract.methods
      .safeTransferFrom(user1Account.address, user2Account.address, '1')
      .encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const safeTransferFromResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(safeTransferFromResult);
    return safeTransferFromResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//mintNFT
async function mintNFT_erc721() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(user2Account.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc721ContractAddr,
    from: user2Account.address,
    value: '',
    data: erc721Contract.methods
      .mintNFT(
        user2Account.address,
        user1Account.address,
        'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/test.json',
      )
      .encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY_2,
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

//setToken
async function setToken_erc721() {
  var txObj = {
    nonce: web3.eth.getTransactionCount(ownerAccount.address),
    gasPrice: web3.eth.gasPrice,
    gasLimit: 1000000,
    to: erc721ContractAddr,
    from: ownerAccount.address,
    value: '',
    data: erc721Contract.methods.setToken(erc20ContractAddr).encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      txObj,
      PRIVATE_KEY,
    );
    const setTokenResult = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log(setTokenResult);
    return setTokenResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//checkTokenId
async function checkTokenId_erc721() {
  try {
    const checkTokenIdResult = await erc721Contract.methods
      .checkTokenId(
        'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/test.json',
      )
      .call();

    console.log(checkTokenIdResult);
    return checkTokenIdResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//ownerOf
async function ownerOf_erc721() {
  try {
    const ownerOfIdResult = await erc721Contract.methods.ownerOf('1').call();

    console.log(ownerOfIdResult);
    return ownerOfIdResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//balanceOf
app.get('/erc721/balanceOf', (req, res) => {
  balanceOf_erc721().then((result) => {
    res.send(result);
  });
});

//approve
app.get('/erc721/approve', (req, res) => {
  approve_erc721().then((result) => {
    res.send(result);
  });
});

//getApproved
app.get('/erc721/getApproved', (req, res) => {
  getApprove_erc721().then((result) => {
    res.send(result);
  });
});

//safeTransferFrom(transferFrom)
app.get('/erc721/safeTransferFrom', (req, res) => {
  safeTransferFrom_erc721().then((result) => {
    res.send(result);
  });
});

//mintNFT
app.get('/erc721/mintNFT', (req, res) => {
  mintNFT_erc721().then((result) => {
    res.send(result);
  });
});

//setToken
app.get('/erc721/setToken', (req, res) => {
  setToken_erc721().then((result) => {
    res.send(result);
  });
});

//checkTokenId
app.get('/erc721/checkTokenId', (req, res) => {
  checkTokenId_erc721().then((result) => {
    res.send(result);
  });
});

//ownerOf
app.get('/erc721/ownerOf', (req, res) => {
  ownerOf_erc721().then((result) => {
    res.send(result);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Server!');
});

app.listen(port, () => {
  console.log('Listening...');
});
