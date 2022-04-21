import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

function RolComponent(props) {
  const rol = props.rol;

  useEffect(() => {
  }, []);

  if(rol){
    return (
    <div id="rol">
        <h2>Tu rol en esta red es: {rol}</h2>
    </div>
  );
  } else {
    return(
      <div id="rol">
      <h2> Algo no ha ido bien.. por favor escoge de nuevo tu cuenta con Metamask 🦊</h2>
    </div>
    )
  }
}

export default connect()(RolComponent);
