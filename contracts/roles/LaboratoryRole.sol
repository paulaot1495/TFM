pragma solidity >=0.6.0 <0.9.0;

//OpenZeppelin library 'AccessControl' import
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Contract 'LaboratoryRole' to manage laboratory role - to check, to add, to remove
contract LaboratoryRole is AccessControl, Ownable{

  bytes32 public constant LABORATORY_ROLE = keccak256("LABORATORY_ROLE");

  //Event thrown when adding
  event laboratoryAdded(address indexed account);
  //Event thrown when removing
  event laboratoryRemoved(address indexed account);


  //Checks laboratory role
  function isLaboratory(address account) public view returns (bool) {
    return hasRole(LABORATORY_ROLE, account);
  }

  //Add Laboratory role to an account. Only admin account can use it.
  function addLaboratory(address account) public onlyOwner {
   _addLaboratory(account);
  }

  //Remove laboratory role of an account. Only admin account can use it. 
  function removeLaboratory(address account) public onlyOwner {
    _removeLaboratory(account);
  }

  function _addLaboratory(address account) internal {
    _grantRole(LABORATORY_ROLE, account);
    emit laboratoryAdded(account);
  }

  function _removeLaboratory(address account) internal {
    _revokeRole(LABORATORY_ROLE, account);
    emit laboratoryRemoved(account);
  }
}