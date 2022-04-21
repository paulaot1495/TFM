import React, { useEffect, useState } from "react";
import { useDrizzleContext } from "./drizzle/drizzleContext";
import ManageRole from "./components/manageRole";
import MetamaskComponent from "./components/metamaskComponent";
import RolComponent from "./components/rolComponent";
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
  const drizzle = useDrizzleContext();
  const drizzleState = drizzle.store.getState();

  const [accountValue, setAccountValue] = useState(account);
  let rol;

  useEffect(() => {
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccountValue(accounts[0]);
        const a = drizzle.contracts.VaccineNetwork.methods.getAccountRole.cacheCall(accounts[0]);
        setRolKey(a);
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
    if(contract && contract.getAccountRole[rolKey]) {
      const roles = {
        0: 'Usuario genérico',
        1: 'Transportista', 
        2: 'Laboratorio',
        3: 'Centro de vacunación',
        4: 'Administrador'
      }
      rol = roles[contract.getAccountRole[rolKey].value];
    }
  }

  if (true) {
    return (
      <div>
        <div>{getTxStatus()}</div>
        <div>{getRole()}</div>
        <ToastContainer />
        <MetamaskComponent account={accountValue}></MetamaskComponent>
        <RolComponent rol={rol}></RolComponent>
        <ManageRole 
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addLaboratory}
          title="Añade un responsable del Laboratorio"
          role="lab"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeLaboratory}
          title="Elimina al responsable del Laboratorio"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole 
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addCarrier}
          title="Añade un transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeCarrier}
          title="Elimina al transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addVaccineCenter}
          title="Añade un responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeVaccineCenter}
          title="Elimina al responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
      </div>
    );
  } else {
    return (
      <p> Es falso </p>
    )
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
