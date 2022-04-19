// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

import './roles/LaboratoryRole.sol';
import './roles/CarrierRole.sol';
import './roles/VaccineCenterRole.sol';

/**
 * @title Vacine Network Model
 */
contract VaccineNetwork is LaboratoryRole, CarrierRole, VaccineCenterRole{
    uint transport_phases;
}