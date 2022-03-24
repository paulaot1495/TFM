// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import './roles/LaboratoryRole.sol';
import './roles/CarrierRole.sol';
/**
 * @title Vacine Network Model
 */
contract VaccineNetwork is LaboratoryRole, CarrierRole{

    uint transport_phases;

    constructor(uint _transport_phases) {
        transport_phases = _transport_phases;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
}