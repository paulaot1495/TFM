import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GenericContainer from "./GenericContainer";
import StatusComponent from "./statusComponent";



function CVContainer(props) {
  const [data, setData] = useState("");
  const {accountValue, stackId, rol, rolId, drizzle, drizzleState, setStackId, transactionStack, transactions} = props;

  useEffect(() => {
  }, []);


  const onChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
    <GenericContainer 
            stackId = {stackId}
            setStackId={setStackId}
            accountValue={accountValue}
            drizzle = {drizzle}
            drizzleState = {drizzleState}
            rol = {rol}
            rolId = {rolId}
            transactions = {transactions}
            transactionStack = {transactionStack}
            />
            <StatusComponent
            stackId = {stackId}
            setStackId={setStackId}
            account={accountValue}
            rol = {rol}
            method = {drizzle.contracts.VaccineNetwork.methods.setVaccineCenterPlace}
            classType = 'place-container'
            buttonLabel = 'Como responsable del Centro de Vacunación he recibido el paquete y está en el almacen'/>
            <StatusComponent
            stackId = {stackId}
            setStackId={setStackId}
            account={accountValue}
            rol = {rol}
            method = {drizzle.contracts.VaccineNetwork.methods.setVaccineKo}
            classType = 'status-ko-container' 
            buttonLabel = 'Se ha roto la cadena de frío'/>
            <StatusComponent
            stackId = {stackId}
            setStackId={setStackId}
            account={accountValue}
            rol = {rol}
            method = {drizzle.contracts.VaccineNetwork.methods.setVaccineOk}
            classType = 'status-ok-container' 
            buttonLabel = 'La vacuna está lista para administrarse'/>

    </div>
  );
}


export default connect()(CVContainer);
