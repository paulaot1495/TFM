// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

//OpenZeppelin library 'AccessControl' import
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Contract 'DeviceRole' to manage device role - to check, to add, to remove
contract DeviceRole is AccessControl, Ownable{

  bytes32 public constant DEVICE_ROLE = keccak256("DEVICE_ROLE");

  //Event thrown when adding
  event deviceAdded(address indexed account);
  //Event thrown when removing
  event deviceRemoved(address indexed account);


  //Checks device role
  function isDevice(address account) public view returns (bool) {
    return hasRole(DEVICE_ROLE, account);
  }

  function _addDevice(address account) internal {
    _grantRole(DEVICE_ROLE, account);
    emit deviceAdded(account);
  }

  function _removeDevice(address account) internal {
    _revokeRole(DEVICE_ROLE, account);
    emit deviceRemoved(account);
  }
}