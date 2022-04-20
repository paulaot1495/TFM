import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

function RolComponent(props) {
  const rol = props.rol;

  useEffect(() => {
  }, []);

  return (
    <div id="rol">
        <h2>Tu rol en esta red es: {rol}</h2>
    </div>
  );
}

export default connect()(RolComponent);
