import React, { useEffect, useState } from "react";
import { useDrizzleContext } from "./drizzle/drizzleContext";
import AdminContainer from "./components/AdminContainer";
import GenericContainer from "./components/GenericContainer";
import InfoComponent from "./components/InfoComponent";
import NoRoleContainer from "./components/NoRoleContainer";
import CarrierContainer from "./components/CarrierContainer";
import CVContainer from "./components/CVContainer";

import { newContextComponents } from "@drizzle/react-components";
import './App.css';
import VaccineNetwork from "./contracts/VaccineNetwork.json";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';



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
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccountValue(accounts[0]);
        const a = drizzle.contracts.VaccineNetwork.methods.getAccountRole.cacheCall(accounts[0]);
        setRolKey(a);
        const b = drizzle.contracts.VaccineNetwork.methods.getVaccineId.cacheCall();
        setVaccineId(b);
      });
    }, []);

  const getTxStatus = () => {
    if (transactionStack[stackId]) {
      const txHash = transactionStack[stackId];
      if(transactions[txHash] && transactions[txHash].status) {
        if(transactions[txHash].status === 'success' && !toast.isActive('success')){
          let text = transactions[txHash].receipt.transactionHash
          toast.success('La transacción ha ido bien', { toastId: 'success', position: toast.POSITION.TOP_RIGHT });
        } else if (transactions[txHash].status === 'error' && !toast.isActive('error')){
          const error = transactions[txHash].error.message.substring(142, 181) || 'Ha ocurrido un error.'
          toast.error(error, { toastId: 'error', position: toast.POSITION.TOP_RIGHT });
        };
      }
    } 
  }
  const getRole = () => {
    if(contract && contract.getVaccineId[vaccineIdKey]) {
      vaccineId = contract.getVaccineId[vaccineIdKey].value;
    }
    if(contract && contract.getAccountRole[rolKey]) {
      const roles = {
        0: 'No tienes Rol asignado',
        1: 'Laboratorio', 
        2: 'Transportista',
        3: 'Centro de vacunación'
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
        <div>{getTxStatus()}</div>
        <div>{getRole()}</div>
        <ToastContainer />
        <NoRoleContainer 
          rol = {rol_name}
          stackId = {stackId}
          setStackId={setStackId}
          accountValue={accountValue}
          drizzle = {drizzle}
          drizzleState = {drizzleState}
      />
      </div>
    );
  } else if(rol_id === '1' ) {
    return (
      <div>
      <div>{getTxStatus()}</div>
      <ToastContainer />
      <AdminContainer 
      rol = {rol_name}
      rolId = {rol}
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      vaccineId = {vaccineId}
      />
    </div>
    )
  } else if (rol_id === '2') {
    return(
      <div>
      <div>{getTxStatus()}</div>
      <ToastContainer />
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
      <div>{getTxStatus()}</div>
      <ToastContainer />
      <CVContainer 
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
  } else {
    return(
      <div>
      <div>{getTxStatus()}</div>
      <ToastContainer />
      <GenericContainer 
      stackId = {stackId}
      setStackId={setStackId}
      accountValue={accountValue}
      drizzle = {drizzle}
      drizzleState = {drizzleState}
      rol = {rol_name}
      rolId = {rol}
      vaccineId = {vaccineId}
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
