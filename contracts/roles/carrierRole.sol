pragma solidity >=0.4.24;

//OpenZeppelin library 'AccessControl' import
import "@openzeppelin/contracts/access/AccessControl.sol";

//Contract 'CarrierRole' to manage carrier role - to check, to add, to remove
contract CarrierRole is AccessControl{

  bytes32 public constant CARRIER_ROLE = keccak256("CARRIER_ROLE");

  //Event thrown when adding
  event carrierAdded(address indexed account);
  //Event thrown when removing
  event carrierRemoved(address indexed account);


  //Checks carrier role
  function isCarrier(address account) public view returns (bool) {
    return hasRole(CARRIER_ROLE, account);
  }

  //Add Carrier role to an account. Only admin account can use it.
  function addCarrier(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
   _addCarrier(account);
  }

  //Remove Carrier role of an account. Only admin account can use it. 
  function removeCarrier(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
    _removeCarrier(account);
  }

  function _addCarrier(address account) internal {
    _grantRole(CARRIER_ROLE, account);
    emit carrierAdded(account);
  }

  function _removeCarrier(address account) internal {
    _revokeRole(CARRIER_ROLE, account);
    emit carrierRemoved(account);
  }
}