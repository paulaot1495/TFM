import React, { useEffect, useState } from "react";
import { useDrizzleContext } from "./drizzle/drizzleContext";
import AddRole from "./addRole";

import { connect } from "react-redux";

function App({ dataCall, account }) {
  const drizzle = useDrizzleContext();
  const [data, setData] = useState("");

  useEffect(() => {
  }, []);

  if (true) {
    return (
      <div>
        <h1>Vamos a crear la red de vacunas</h1>
        <h2>Cuenta metamask {account}</h2>
        <AddRole 
          account={account}
          method={drizzle.contracts.VaccineNetwork.methods.addLaboratory}
          title="Añade un responsable del Laboratorio"
          owner={drizzle.contracts.VaccineNetwork.options.from}>
        </AddRole>
        <AddRole 
          account={account}
          method={drizzle.contracts.VaccineNetwork.methods.addCarrier}
          title="Añade un transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}>
        </AddRole>
        <AddRole 
          account={account}
          method={drizzle.contracts.VaccineNetwork.methods.addVaccineCenter}
          title="Añade un responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}>
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
    carrierRole: state.contracts.VaccineNetwork.CARRIER_ROLE,
    account: state.accounts[0],
    owner: state.contracts.VaccineNetwork.owner
  };
};

export default connect(mapStateToProps)(App);
