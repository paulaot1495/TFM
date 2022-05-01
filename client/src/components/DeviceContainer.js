import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GenericContainer from "./GenericContainer";
import SetComponent from "./SetComponent";



function DeviceContainer(props) {
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
    <SetComponent 
            stackId = {stackId}
            setStackId={setStackId}
            account={accountValue}
            drizzle = {drizzle}
            drizzleState = {drizzleState}
            /> 
    </div>
  );
}


export default connect()(DeviceContainer);
