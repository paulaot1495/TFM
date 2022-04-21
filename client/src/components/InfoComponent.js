import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

function InfoComponent(props) {

  useEffect(() => {
  }, []);

    return (
    <div id="rol">
        <h1> Instrucciones de la aplicación: </h1>
        <h2> Para registrar un  lote de vacunas etc etc Esa misma noche nació un bosque en la habitación de Max y creció y creció hasta que había lianas colgando del techo y las paredes se convirtieron en el mundo entero y apareció un océano con un barco particular para él y Max se marchó navegando a través del día y de la noche entrando y saliendo por las semanas saltándose casi un año hasta llegar a donde viven los monstruos.</h2>
    </div>
  );
}

export default connect()(InfoComponent);
