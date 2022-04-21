import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

function VaccineIdComponent(props) {
  const vaccineId = props.vaccineId;
  const rol = props.rolId;

  useEffect(() => {
  }, []);

  if(rol && rol != '0'){
    return (
    <div id="vaccine-id">
        <h2>El id del lote de vacunas de esta red es: '{vaccineId || '0'}'</h2>
    </div>
  );
  } else {
    return(
      <div id="vaccine-id">
      <h2> No formas parte de la red activa pero puedes consultar el estado de las anteriores.</h2>
    </div>
    )
  }
}

export default connect()(VaccineIdComponent);
