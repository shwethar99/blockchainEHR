var Patient = artifacts.require("./Patient.sol");
var Condition = artifacts.require("./Condition.sol");
var PatientAllergies = artifacts.require("./PatientAllergies.sol");

module.exports = function(deployer) {
  deployer.deploy(Patient);
  deployer.deploy(Condition);
  deployer.deploy(PatientAllergies);

};
