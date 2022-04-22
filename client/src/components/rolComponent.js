import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

function RolComponent(props) {
  const rol = props.rol;

  useEffect(() => {
  }, []);

  if ( rol == 'No tienes Rol asignado') {
    return (
      <div id="rol">
          <h2>No tienes ningún rol en la red activa.</h2>
      </div>
    )
  } else if(rol){
  return (
    <div id="rol">
        <h2>Tu rol en esta red es: {rol}</h2>
    </div>
  )} else {
    return(
      <div id="rol">
      <h2> No hemos podido identificar tu rol.. por favor escoge de nuevo tu cuenta con Metamask 🦊</h2>
    </div>
    )
  }
}

export default connect()(RolComponent);
