import React, { useEffect } from "react";
import { connect } from "react-redux";
import GetComponent from "./GetComponent";
import MetamaskComponent from "./metamaskComponent";
import RolComponent from "./rolComponent";
import VaccineIdComponent from "./VaccineIdComponent"
import TransactionManagement from "./TransactionManagement"

function GenericContainer(props) {
  const {accountValue, rol, transactionStack, transactions, stackId, drizzle, drizzleState, rolId, vaccineId} = props;

  useEffect(() => {
  }, []);

  return (
    <div>
        <TransactionManagement          
          transactions = {transactions}
          transactionStack = {transactionStack}
          stackId = {stackId}/>
        <MetamaskComponent account={accountValue}></MetamaskComponent>
        <RolComponent rol={rol}></RolComponent>
        <VaccineIdComponent rol={rol} rolId={rolId} vaccineId={vaccineId}></VaccineIdComponent>
      <GetComponent
            drizzle = {drizzle}
            drizzleState = {drizzleState}
      >
      </GetComponent>
    </div>
  );
}


export default connect()(GenericContainer);
