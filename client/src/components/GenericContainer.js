import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GetComponent from "./GetComponent";
import MetamaskComponent from "./metamaskComponent";
import RolComponent from "./rolComponent";
import VaccineIdComponent from "./VaccineIdComponent"
import TransactionManagement from "./TransactionManagement"

function GenericContainer(props) {
  const [data, setData] = useState("");
  const {accountValue, rol, transactionStack, transactions, stackId, drizzle, drizzleState, rolId, vaccineId} = props;

  useEffect(() => {
  }, []);


  const onChange = (event) => {
    setData(event.target.value);
  };

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
