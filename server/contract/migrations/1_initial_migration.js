const SimpleToken = artifacts.require("SnorLaxToken");
module.exports = function (deployer) {
  deployer.deploy(SnorLaxToken);
};
