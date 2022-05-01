import React, { useEffect, useState } from "react";
import { useDrizzleContext } from "./drizzle/drizzleContext";
import AdminContainer from "./components/AdminContainer";
import GenericContainer from "./components/GenericContainer";
import InfoComponent from "./components/InfoComponent";
import NoRoleContainer from "./components/NoRoleContainer";
import CarrierContainer from "./components/CarrierContainer";
import CVContainer from "./components/CVContainer";
import './App.css';
import { connect } from "react-redux";

function App({ account, web3, transactionStack, transactions, contract}) {

  const [stackId, setStackId] = useState("");
  const [rolKey, setRolKey] = useState("");
  const [vaccineIdKey, setVaccineId] = useState("");
  const drizzle = useDrizzleContext();
  const drizzleState = drizzle.store.getState();

  const [accountValue, setAccountValue] = useState(account);
  let rol_name;
  let rol;
  let vaccineId;

  useEffect(() => {
    const a = drizzle.contracts.VaccineNetwork.methods.getAccountRole.cacheCall(account);
    setRolKey(a);
    const b = drizzle.contracts.VaccineNetwork.methods.getVaccineId.cacheCall();
    setVaccineId(b);
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccountValue(accounts[0]);
        const a = drizzle.contracts.VaccineNetwork.methods.getAccountRole.cacheCall(accounts[0]);
        setRolKey(a);
        const b = drizzle.contracts.VaccineNetwork.methods.getVaccineId.cacheCall();
        setVaccineId(b);
      });
    }, []);

  const getRole = () => {
    if(contract && contract.getVaccineId[vaccineIdKey]) {
      vaccineId = contract.getVaccineId[vaccineIdKey].value;
    }
    if(contract && contract.getAccountRole[rolKey]) {
      const roles = {
        0: 'No tienes Rol asignado',
        1: 'Laboratorio', 
        2: 'Transportista',
        3: 'Centro de vacunación',
        4: 'Dispositivo'
      }
      rol = contract.getAccountRole[rolKey].value
      rol_name = roles[rol];
      return rol;
    }
  }

  let rol_id = getRole();
  if ( rol_id === '0') {
    return (
      <div>

        <NoRoleContainer 
          rol = {rol_name}
          stackId = {stackId}
          setStackId={setStackId}
          accountValue={accountValue}
          drizzle = {drizzle}
          drizzleState = {drizzleState}
          transactions = {transactions}
          transactionStack = {transactionStack}/>
      </div>
    );
  } else if(rol_id === '1' ) {
    return (
      <div>
      <AdminContainer 
      rol = {rol_name}
      rolId = {rol}
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      vaccineId = {vaccineId}
      transactions = {transactions}
      transactionStack = {transactionStack}/>
    </div>
    )
  } else if (rol_id === '2') {
    return(
      <div>
      <CarrierContainer 
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      rol = {rol_name}
      rolId = {rol}
      vaccineId = {vaccineId}
      />
      </div>
    )
  } else if (rol_id === '3') {
    return(
      <div>
      <CVContainer 
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      rol = {rol_name}
      rolId = {rol}
      vaccineId = {vaccineId}
      transactions = {transactions}
      transactionStack = {transactionStack}
      />
      </div>
    )
  } else if (rol_id === '4') {
    return(
      <div>
      <DeviceContainer 
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      rol = {rol_name}
      rolId = {rol}
      vaccineId = {vaccineId}
      transactions = {transactions}
      transactionStack = {transactionStack}
      />
      </div>
    )
  } else {
    return(
      <div>
      <GenericContainer 
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      rol = {rol_name}
      rolId = {rol}
      vaccineId = {vaccineId}
      transactions = {transactions}
      transactionStack = {transactionStack}
      />
      <InfoComponent/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accounts[0],
    owner: state.contracts.VaccineNetwork.owner,
    transactionStack: state.transactionStack,
    transactions: state.transactions,
    contract: state.contracts.VaccineNetwork
  };
};

export default connect(mapStateToProps)(App);
