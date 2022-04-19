const VaccineNetwork = artifacts.require("VaccineNetwork");

module.exports = function (deployer) {
  deployer.deploy(VaccineNetwork);
};
