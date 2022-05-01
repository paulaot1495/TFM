import React, { useEffect } from "react";
import { connect } from "react-redux";
import GenericContainer from "./GenericContainer";
import StatusComponent from "./statusComponent";



function CarrierContainer(props) {
  const {accountValue, stackId, rol, rolId, drizzle, drizzleState, setStackId, transactionStack, transactions} = props;

  useEffect(() => {
  }, []);


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
            method = {drizzle.contracts.VaccineNetwork.methods.setCarrierPlace}
            classType = 'place-container'
            buttonLabel = 'Como transportista he recibido el paquete'/>
            <StatusComponent
            stackId = {stackId}
            setStackId={setStackId}
            account={accountValue}
            rol = {rol}
            method = {drizzle.contracts.VaccineNetwork.methods.setVaccineKo}
            classType = 'status-ko-container' 
            buttonLabel = 'Se ha roto la cadena de frío'/>

    </div>
  );
}


export default connect()(CarrierContainer);
