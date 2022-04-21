pragma solidity >=0.6.0 <0.9.0;

//OpenZeppelin library 'AccessControl' import
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Contract 'VaccineCenterRole' to manage vaccine center role - to check, to add, to remove
contract VaccineCenterRole is AccessControl, Ownable{

  bytes32 public constant VC_ROLE = keccak256("VC_ROLE");

  //Event thrown when adding
  event vaccineCenterAdded(address indexed account);
  //Event thrown when removing
  event vaccineCenterRemoved(address indexed account);


  //Checks vaccine center role
  function isVaccineCenter(address account) public view returns (bool) {
    return hasRole(VC_ROLE, account);
  }

  function _addVaccineCenter(address account) internal {
    _grantRole(VC_ROLE, account);
    emit vaccineCenterAdded(account);
  }

  function _removeVaccineCenter(address account) internal {
    _revokeRole(VC_ROLE, account);
    emit vaccineCenterRemoved(account);
  }
}