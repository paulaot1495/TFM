import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function RegisterComponent(props) {
  const [key, setKey] = useState("");
  const {drizzle, accountValue, setStackId} = props;
  let addressValue;
  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const  txId= drizzle.contracts.VaccineNetwork.methods.addLaboratory.cacheSend({ from: accountValue, gas: 3000000, value: 100000000000000000});
    setStackId(txId);
  };


  return (
    <div>
      <form className="register-view" onSubmit={onSubmit}>
        <label className="add-user-label">      
        </label>
        <input className="register-view-button" type="submit" value='Registrar un lote de vacunas' />
      </form>
    </div>
  );
}



export default connect()(RegisterComponent);
