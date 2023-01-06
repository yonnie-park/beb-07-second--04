const express = require('express');
const app = express();
const Web3 = require('web3');
const port = 8080;
const { erc20_ABI, erc721_ABI } = require('./ABI');

const erc20ContractAddr = '0x42d9B04B04eB263C613DC27572BC82591307FA66'; //ganache erc20 CA
const erc721ContractAddr = '0xBB1CB6310CABd2272716df72c21cf0f7eB5C99A2'; //ganache erc721 CA

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); //ganache provider

var erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화
var erc721Contract = new web3.eth.Contract(erc721_ABI, erc721ContractAddr); //erc721 contract 인스턴스화

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
  const accounts = await web3.eth.getAccounts();

  try {
    const approveResult = await erc20Contract.methods
      .approve(erc721ContractAddr, '100')
      .send({ from: accounts[2] });

    console.log(approveResult);
    return approveResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//allowance
async function allowance_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const allowanceResult = await erc20Contract.methods
      .allowance(accounts[2], erc721ContractAddr)
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
  const accounts = await web3.eth.getAccounts();

  try {
    const transferFromResult = await erc20Contract.methods
      .transferFrom(accounts[0], accounts[1], '500')
      .send({ from: accounts[0] });

    console.log(transferFromResult);
    return transferFromResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//transfer
async function transfer_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const transferResult = await erc20Contract.methods
      .transfer(accounts[1], '100')
      .send({ from: accounts[2] });

    console.log(transferResult);
    return transferResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//balanceOf
async function balanceOf_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const balanceOfResult = await erc20Contract.methods
      .balanceOf(accounts[2])
      .call();

    console.log(balanceOfResult);
    return balanceOfResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//isTokenLock
async function isTokenLock_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const checkLockResult = await erc20Contract.methods
      .isTokenLock(accounts[1], accounts[2])
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
  const accounts = await web3.eth.getAccounts();

  try {
    const removeAllResult = await erc20Contract.methods
      .removeTokenLock()
      .send({ from: accounts[0] });

    console.log(removeAllResult);
    return removeAllResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//removePersonalTokenLock
async function removePersonalTokenLock_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const removePersonalResult = await erc20Contract.methods
      .removePersonalTokenLock(accounts[1])
      .send({ from: accounts[0] });

    console.log(removePersonalResult);
    return removePersonalResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//assignTokenLock
async function assignTokenLock_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const assignAllResult = await erc20Contract.methods
      .assignTokenLock()
      .send({ from: accounts[0] });

    console.log(assignAllResult);
    return assignAllResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//assignPersonalTokenLock
async function assignPersonalTokenLock_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const assignPersonalResult = await erc20Contract.methods
      .assignPersonalTokenLock(accounts[1])
      .send({ from: accounts[0] });

    console.log(assignPersonalResult);
    return assignPersonalResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//transferOwnership
async function transferOwnership_erc20() {
  const accounts = await web3.eth.getAccounts();

  try {
    const giveOwnerResult = await erc20Contract.methods
      .transferOwnership(accounts[1])
      .send({ from: accounts[0] });

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
  const accounts = await web3.eth.getAccounts();

  try {
    const balanceOfResult = await erc721Contract.methods
      .balanceOf(accounts[2])
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
  const accounts = await web3.eth.getAccounts();

  try {
    const approveResult = await erc721Contract.methods
      .approve(accounts[1], '1')
      .send({ from: accounts[2] });

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
  const accounts = await web3.eth.getAccounts();

  try {
    const safeTransferFromResult = await erc721Contract.methods
      .safeTransferFrom(accounts[2], accounts[3], '1')
      .send();

    console.log(safeTransferFromResult);
    return safeTransferFromResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//mintNFT
async function mintNFT_erc721() {
  const accounts = await web3.eth.getAccounts();

  try {
    const mintNFTResult = await erc721Contract.methods
      .mintNFT(
        accounts[2],
        'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/test.json',
      )
      .send({ from: accounts[2], gas: '1000000' });

    console.log(mintNFTResult);
    return mintNFTResult;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//setToken
async function setToken_erc721() {
  const accounts = await web3.eth.getAccounts();

  try {
    const setTokenResult = await erc721Contract.methods
      .setToken(erc20ContractAddr)
      .send({ from: accounts[0] });

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
