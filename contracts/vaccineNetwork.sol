// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

import './roles/LaboratoryRole.sol';
import './roles/CarrierRole.sol';
import './roles/VaccineCenterRole.sol';
/**
 * @title Vacine Network Model
 */
contract VaccineNetwork is LaboratoryRole, CarrierRole, VaccineCenterRole {
    uint transport_phases;
    address empty = 0x0000000000000000000000000000000000000000;
    bool laboratory = false;
    bool center = false;
    bool carrier = false;
    enum Rol {None, Carrier, Laboratory, VaccineCenter, Admin}

    mapping(Rol => address) public users;
     mapping(address => Rol) public roles;


    //Add Laboratory role to an account. Only admin account can use it.
    function addLaboratory(address account) public {
        require(!laboratory, "Ya hay un laboratorio creado, eliminalo antes");
        require(roles[account] == Rol.None, "Esta cuenta ya esta asignada a un rol");
        users[Rol.Laboratory] = account;
        roles[account] = Rol.Laboratory;
        laboratory = true;
        _addLaboratory(account);
    }

      //Remove laboratory role of an account. Only admin account can use it. 
    function removeLaboratory(address account) public {
        require(users[Rol.Laboratory] == account, "Esta cuenta no tiene rol de laboratorio");
        roles[account] = Rol.None;
        users[Rol.Laboratory] = empty;
        laboratory = false;
        _removeLaboratory(account);
    }

    //Add VaccineCenter role to an account. Only admin account can use it.
    function addVaccineCenter(address account) public {
        require(!center, "Ya hay un responsable del centro de vacunacion creado");
        require(roles[account] == Rol.None, "Esta cuenta ya esta asignada a un rol");
        users[Rol.VaccineCenter] = account;
        roles[account] = Rol.VaccineCenter;
        center = true;
        _addLaboratory(account);
    }

    //Remove VaccineCenter role of an account. Only admin account can use it. 
    function removeVaccineCenter(address account) public {
        require(users[Rol.VaccineCenter] == account, "Esta cuenta no tiene rol de centro");
        roles[account] = Rol.None;
        users[Rol.VaccineCenter] = empty;
        center = false;
        _removeVaccineCenter(account);
    }

    //Add Carrier role to an account. Only admin account can use it.
    function addCarrier(address account) public {
        require(!carrier, "Ya hay un transportista creado, eliminalo antes");
        require(roles[account] == Rol.None, "Esta cuenta ya esta asignada a un rol");
        users[Rol.Carrier] = account;
        roles[account] = Rol.Carrier;
        carrier = true;
        _addCarrier(account);
    }

    //Remove Carrier role of an account. Only admin account can use it. 
    function removeCarrier(address account) public {
        require(users[Rol.Carrier] == account, "Esta cuenta no tiene rol transportista");
        roles[account] = Rol.None;
        users[Rol.Carrier] = 0x0000000000000000000000000000000000000000;
        carrier = false;
        _removeCarrier(account);
    }

    function getAccountRole (address _address) public view returns (Rol) {
        return roles[_address];
    }

    function getRoleAccount (Rol _rol) public view returns (address) {
        return users[_rol];
    }

}