import React, { useEffect, useState } from "react";
import { useDrizzleContext } from "./drizzle/drizzleContext";
import AddRole from "./components/addRole";
import MetamaskComponent from "./components/metamaskComponent";
import RolComponent from "./components/rolComponent";
import { newContextComponents } from "@drizzle/react-components";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import VaccineNetwork from "./contracts/VaccineNetwork.json";



import { connect } from "react-redux";

function App({ account, web3}) {

  const drizzle = useDrizzleContext();
  const drizzleState = drizzle.store.getState();

  const [accountValue, setAccountValue] = useState(account);

  useEffect(() => {
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccountValue(accounts[0]);
      });
    }, []);

  if (true) {
    return (
      <div>
        <ToastContainer />
        <MetamaskComponent account={accountValue}></MetamaskComponent>
        <RolComponent rol="Administrador"></RolComponent>
        <AddRole 
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addLaboratory}
          title="Añade un responsable del Laboratorio"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </AddRole>
        <AddRole 
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addCarrier}
          title="Añade un transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </AddRole>
        <AddRole 
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addVaccineCenter}
          title="Añade un responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </AddRole>
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
    owner: state.contracts.VaccineNetwork.owner
  };
};

export default connect(mapStateToProps)(App);
