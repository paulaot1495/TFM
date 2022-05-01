import React, { useEffect } from "react";

import { connect } from "react-redux";

function InfoComponent(props) {

  useEffect(() => {
  }, []);

    return (
    <div id="rol">
        <h1> Instrucciones de la aplicación: </h1>
        <h2> Está aplicación permite a un laboratorio registrar un lote de vacunas para que cualquier usuario pueda disponer del estado y lugar del lote.</h2>
        <h2> Los encargados de actualizar la aplicación serán los miembros registrados por el responsable del laboratorio. Deberá añadir dos roles, el de transportista y el de responsable del Centro de Vacunación. Cada uno de estos roles tendrán funcionalidades propias y exclusivas de su rol para actualizar el estado y el lugar de las vacunas. </h2>
        <h2> Solo puede gestionarse un lote de vacunas al mismo tiempo, hasta que no llegue al destino o se rompa la cadena de frío no podrá registrarse otro. </h2>
        <h2> Para registrar un nuevo lote de vacunas deberás pagar el precio de 10e17 Wei, de los cuales 3 10e16 Wei irán destinados al transportista al completarse el proceso. </h2>
        <h2> Los transportistas reciben buenas puntuaciones siempre que  entreguen el producto sin que la cadena de frío se haya roto, por lo que antes de decidirte por uno, comprueba su puntuación.</h2>
    </div>
  );
}

export default connect()(InfoComponent);
