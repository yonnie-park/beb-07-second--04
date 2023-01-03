const SimpleToken = artifacts.require("SimpleToken");

contract("SimpleToken", (accounts) => {
  it("토큰의 이름이 SimpleToken입니다.", async () => {
    const instance = await SimpleToken.deployed();
    const tokenName = await instance.name();
    assert.equal(
      tokenName,
      "SimpleToken",
      "토큰의 이름이 SimpleToken과 다릅니다."
    );
  });

  it("토큰의 심볼이 SIM입니다", async () => {
    const instance = await SimpleToken.deployed();
    const tokenName = await instance.symbol();
    assert.equal(tokenName, "SIM", "토큰의 심볼이 SIM과 다릅니다.");
  });

  it("배포 계정에서 SimpleToken 10,000개를 보유합니다", async () => {
    const instance = await SimpleToken.deployed();
    const balance = await instance.balanceOf(accounts[0]);
    assert.equal(
      balance.toNumber(),
      10000,
      "토큰 보유량이 10000개와 다릅니다."
    );
  });

  it("서버 계정에서 SimpleToken 0개를 보유합니다", async () => {
    const instance = await SimpleToken.deployed();
    const balance = await instance.balanceOf(accounts[1]);
    assert.equal(balance.toNumber(), 0, "토큰 보유량이 0개와 다릅니다.");
  });

  it("다른 계정으로 토큰을 전송합니다.", async () => {
    const instance = await SimpleToken.deployed();

    // 계정을 설정합니다.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // 계정의 초기 토큰 보유량을 가져옵니다.
    const accountOneStartingBalance = (
      await instance.balanceOf(accountOne)
    ).toNumber();
    const accountTwoStartingBalance = (
      await instance.balanceOf(accountTwo)
    ).toNumber();

    // 첫번째 계정에서 두번째 계정으로 토큰을 전송합니다.
    const amount = 10;
    await instance.transfer(accountTwo, amount);

    // 전송 후 계정의 토큰 보유량을 가져옵니다.
    const accountOneEndingBalance = (
      await instance.balanceOf(accountOne)
    ).toNumber();
    const accountTwoEndingBalance = (
      await instance.balanceOf(accountTwo)
    ).toNumber();

    assert.equal(
      accountOneEndingBalance,
      accountOneStartingBalance - amount,
      "토큰이 올바르게 송신되지 않았습니다."
    );
    assert.equal(
      accountTwoEndingBalance,
      accountTwoStartingBalance + amount,
      "토큰이 올바르게 수신되지 않았습니다."
    );
  });

  it("배포 계정에서 서버 계정으로 SimpleToken를 양도합니다", async () => {
    const instance = await SimpleToken.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    await instance.approve(accountTwo, 7777);
    const balance = await instance.allowance(accountOne, accountTwo);

    assert.equal(
      balance.toNumber(),
      7777,
      "양도 받은 갯수가 일치하지 않습니다."
    );
  });

  it("서버 계정에서 양도받은 토큰을 유저 계정으로 전송합니다.", async () => {
    const instance = await SimpleToken.deployed();

    const deployAccount = accounts[0];
    const serverAccount = accounts[1];
    const userAccount = accounts[2];

    await instance.approve(serverAccount, 10000);

    await instance.transferFrom(deployAccount, userAccount, 123, {
      from: serverAccount,
    });

    const userAccountBalance = await instance.balanceOf(userAccount);

    assert.equal(
      userAccountBalance.toNumber(),
      123,
      "유저 계정의 잔고가 서버 계정에서 보낸 토큰 갯수와 일치하지 않습니다."
    );
  });
});
