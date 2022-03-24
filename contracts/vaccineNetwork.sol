// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Vacine Network Model
 */
contract VaccineNetwork {

    uint transport_phases;

    constructor(uint _transport_phases) {
        transport_phases = _transport_phases;
    }
}