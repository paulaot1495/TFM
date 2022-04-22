import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GenericContainer from "./GenericContainer";
import InfoComponent from "./InfoComponent";
import StatusComponent from "./StatusComponent";



function CarrierContainer(props) {
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
