// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

import './roles/LaboratoryRole.sol';
import './roles/CarrierRole.sol';
import './roles/VaccineCenterRole.sol';
import './roles/DeviceRole.sol';
/**
 * @title Vaccine Network Model
 */
contract VaccineNetwork is LaboratoryRole, CarrierRole, VaccineCenterRole, DeviceRole {

    //Flags para saber si un rol esta creado
    bool laboratory = false;
    bool center = false;
    bool carrier = false;
    bool device = false;

    //Id de lote de vacunas
    uint public vaccine_id = 0;

    //Max temperature
    uint public max_temp = 0;

    //Posibles valores del rol del usuario 
    enum Rol {None, Laboratory, Carrier, VaccineCenter, Device}

    //Posibles estados del lote de vacunas
    enum State {None, Transit, Ok, Ko}

    //Posibles lugares del lote de vacunas
    enum Place {None, Laboratory, Carrier, VaccineCenter}

    //Estructura de datos de los puntos de los transportistas
    struct CarrierPoints {
        uint points;
        uint travels;
    }

    //Asociación de roles a cuentas
    mapping(Rol => address) public users;
    //Asociación de cuentas a roles
    mapping(address => Rol) public roles;

    //Asociación de estados a lote de vacunas
    mapping(uint => State) public states;
    //Asociación de lugares a lote de vacunas
    mapping(uint => Place) public places;

    //Asociación de cuentas de transportista a sus puntos por viajes realizados correctaente
    mapping(address => CarrierPoints) public carriers;

    //Asignar a la cuenta ejecutora el rol de Laboratorio tras pagar 1e17 Wei.
    function batchRegister(uint maxTemp) public payable returns (bool){
        require(msg.value == 1e17, "No has pagado la cantidad acordada.");
        require(!laboratory, "Actualmente hay un lote en transito.");
        require(roles[msg.sender] == Rol.None, "Esta cuenta ya esta asignada a un rol");
        require(states[vaccine_id] == State.None, "Ha habido un error");
        require(places[vaccine_id] == Place.None, "Ha habido un error");

        max_temp = maxTemp;
        laboratory = true;
        _addLaboratory(msg.sender);

        users[Rol.Laboratory] = msg.sender;
        roles[msg.sender] = Rol.Laboratory;
        states[vaccine_id] = State.Transit;
        places[vaccine_id] = Place.Laboratory;

        return true;
    }

    //Desasigna el rol de laboratorio   
    function removeLaboratory(address account) private {
        require(users[Rol.Laboratory] == account, "Esta cuenta no tiene rol de laboratorio");

        laboratory = false;

        roles[account] = Rol.None;
        users[Rol.Laboratory] = 0x0000000000000000000000000000000000000000;
        
        _removeLaboratory(account);
    }

    //Asigna el rol de transportista a la cuenta pasada como parametro. Solo puede hacerlo el rol de laboratorio
    function addCarrier(address account) public {
        require(roles[msg.sender] == Rol.Laboratory, "No tienes permisos para realizar esta accion.");
        require(!carrier, "Ya hay un transportista creado, eliminalo antes");
        require(roles[account] == Rol.None, "Esta cuenta ya esta asignada a un rol");

        carrier = true;

        users[Rol.Carrier] = account;
        roles[account] = Rol.Carrier;

        _addCarrier(account);
    }

    /*
    * Elimina el rol de transportista de la cuenta pasada como parametro. 
    * Solo puede borrarse si el lote sigue en el laboratorio o el producto ha completado la cadena. 
    */    
    function removeCarrier(address account) public {
        require(users[Rol.Carrier] == account, "Esta cuenta no tiene rol transportista");

        carrier = false;

        roles[account] = Rol.None;
        users[Rol.Carrier] = 0x0000000000000000000000000000000000000000;

        _removeCarrier(account);
    }

    //Asigna el rol de responsable del centro de vacunación a la cuenta pasada como parametro. Solo puede hacerlo el rol de laboratorio
    function addVaccineCenter(address account) public {
        require(roles[msg.sender] == Rol.Laboratory, "No tienes permisos para realizar esta accion.");
        require(!center, "Ya hay un responsable del centro de vacunacion creado");
        require(roles[account] == Rol.None, "Esta cuenta ya esta asignada a un rol");

        center = true;

        users[Rol.VaccineCenter] = account;
        roles[account] = Rol.VaccineCenter;

        _addVaccineCenter(account);
    }

    /*
    * Elimina el rol de responsable de centro de vacunación de la cuenta pasada como parametro. 
    * Solo puede hacerlo si el lote sigue en el laboratorio. o el producto ha completado la cadena.
    */
    function removeVaccineCenter(address account) public {
        require(users[Rol.VaccineCenter] == account, "Esta cuenta no tiene rol de centro");
        center = false;

        roles[account] = Rol.None;
        users[Rol.VaccineCenter] = 0x0000000000000000000000000000000000000000;

        _removeVaccineCenter(account);
    }

    //Asigna el rol de device a la cuenta pasada como parametro. Solo puede hacerlo el rol de laboratorio
    function addDevice(address account) public {
        require(roles[msg.sender] == Rol.Laboratory, "No tienes permisos para realizar esta accion.");
        require(!device, "Ya hay un transportista creado, eliminalo antes");
        require(roles[account] == Rol.None, "Esta cuenta ya esta asignada a un rol");

        device = true;

        users[Rol.Device] = account;
        roles[account] = Rol.Device;

        _addDevice(account);
    }

        /*
    * Elimina el rol de dispositivo de la cuenta pasada como parametro. 
    * Solo puede hacerlo si el lote sigue en el laboratorio. o el producto ha completado la cadena.
    */
    function removeDevice(address account) public {
        require(users[Rol.Device] == account, "Esta cuenta no tiene rol de centro");
        device = false;

        roles[account] = Rol.None;
        users[Rol.Device] = 0x0000000000000000000000000000000000000000;

        _removeDevice(account);
    }

    /*
    * El transportista actualiza el el lugar en el que se encuentra el lote de vacunas.
    */
    function setCarrierPlace () public {
        require(roles[msg.sender] == Rol.Carrier, "No tienes permisos para realizar esta accion.");
        require(places[vaccine_id] == Place.Laboratory, "Ha habido un error");

        places[vaccine_id] = Place.Carrier;
    }

    /*
    * El responsable del centro de vacunación actualiza el lugar en el que se encuentra el lote de vacunas.
    */
    function setVaccineCenterPlace () public {
        require(roles[msg.sender] == Rol.VaccineCenter, "No tienes permisos para realizar esta accion.");
        require(places[vaccine_id] == Place.Carrier, "Ha habido un error");

        places[vaccine_id] = Place.VaccineCenter;
    }

    /*
    * El dispositivo inserta temperatura y se compara con la máxima, si la ha sobrepasado cambia el estado del lote a KO.
    */
    function compareTemperatures (uint temp) public {
        require(roles[msg.sender] == Rol.Device, "No tienes permisos para realizar esta accion.");

        if(temp >= max_temp) {
            setVaccineKo();
        }
    }

    /*
    * El responsable del centro de vacunación actualiza el estado del lote de vacunas a ok.
    * Se compensa de forma remunerada al transportista por sus servicios y se le puntua positivamente.
    * Se elimina la red asociada al lote de vacunas ya confirmado.
    */
    function setVaccineOk () public {
        require(roles[msg.sender] == Rol.VaccineCenter, "No tienes permisos para realizar esta accion.");
        require(states[vaccine_id] == State.Transit, "Ha habido un error");

        states[vaccine_id] = State.Ok;

        (bool success, ) =  users[Rol.Carrier].call{value: 3e16}("");
        require(success, "Transfer failed.");  

        carriers[users[Rol.Carrier]].points++;
        carriers[users[Rol.Carrier]].travels++;

        removeLaboratory(users[Rol.Laboratory]);
        removeCarrier(users[Rol.Carrier]);
        removeVaccineCenter(users[Rol.VaccineCenter]);

        vaccine_id++;
    }

    /*
    * El responsable del centro de vacunación o el transportista actualiza el estado del lote de vacunas a ko por que ha detectado la rotura de la cadena de frío.
    * Se compensa de forma remunerada al transportista por sus servicios y se le puntua positivamente solo si el fallo ha ocurrido en el centro de vacunación.
    * Se elimina la red asociada al lote de vacunas.
    */
    function setVaccineKo () public {
        require(roles[msg.sender] == Rol.Carrier || roles[msg.sender] == Rol.VaccineCenter || roles[msg.sender] == Rol.Device, "No tienes permisos para realizar esta accion.");
        require(states[vaccine_id] == State.Transit, "Ha habido un error");
        require(places[vaccine_id] != Place.Laboratory, "Ha habido un error");

        states[vaccine_id] = State.Ko;

        (bool success, ) =  users[Rol.Carrier].call{value: 3e14}("");
        require(success, "Transfer failed."); 

        if (places[vaccine_id] == Place.Carrier) {
            carriers[users[Rol.Carrier]].travels++;
        } else {
            carriers[users[Rol.Carrier]].points++;
            carriers[users[Rol.Carrier]].travels++;
        }

        removeLaboratory(users[Rol.Laboratory]);
        removeCarrier(users[Rol.Carrier]);
        removeVaccineCenter(users[Rol.VaccineCenter]);

        vaccine_id++;
    }

    /* -------------------------------------------------------------------------- */
    /*                                Getters                                     */
    /* -------------------------------------------------------------------------- */

    function getAccountRole (address _address) public view returns (Rol) {
        return roles[_address];
    }

    function getRoleAccount (Rol _rol) public view returns (address) {
        return users[_rol];
    }

    function getVacccineState (uint id) public view returns (State) {
        return states[id];
    }

    function getVacccinePlace (uint id) public view returns (Place) {
        return places[id];
    }

    function getCarrierPoints(address _address) public view returns (uint, uint) {
        return (carriers[_address].points, carriers[_address].travels);
    }

    function getVaccineId() public view returns (uint) {
        return vaccine_id;
    }
}
