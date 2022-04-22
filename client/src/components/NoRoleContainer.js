import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GenericContainer from "./GenericContainer";
import InfoComponent from "./InfoComponent";
import RegisterComponent from "./RegisterComponent";



function NoRoleContainer(props) {
  const [data, setData] = useState("");
  const {accountValue, stackId, rol, rolId, drizzle, drizzleState, setStackId, vaccineId, transactionStack, transactions} = props;

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
            vaccineId = {vaccineId}
            rolId={rolId}
            transactions = {transactions}
            transactionStack = {transactionStack}
            />
            <InfoComponent/>
            <RegisterComponent
            stackId = {stackId}
            setStackId={setStackId}
            accountValue={accountValue}
            drizzle = {drizzle}
            drizzleState = {drizzleState}
            rol = {rol} />
    </div>
  );
}


export default connect()(NoRoleContainer);
