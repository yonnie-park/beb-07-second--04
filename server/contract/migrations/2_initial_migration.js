const SimpleNFT = artifacts.require("SnorLaxNFT");
module.exports = function (deployer) {
  deployer.deploy(SnorLaxNFT);
};
