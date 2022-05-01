import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function RegisterComponent(props) {
  const [data, setData] = useState("");
  const {drizzle, accountValue, setStackId} = props;
  const title = 'Indica la temperatura máxima en grados a la que puede estar sometida el lote'
  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const  txId= drizzle.contracts.VaccineNetwork.methods.batchRegister.cacheSend(data, { from: accountValue, gas: 3000000, value: 100000000000000000});
    setStackId(txId);
  };

  const onChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <form className="register-view" onSubmit={onSubmit}>
        <label className="add-user-label">   
            {title}          
            <input className="register-input" value={data} onChange={onChange} />   
        </label>
        <input className="register-view-button" type="submit" value='Registrar lote de vacunas' />
      </form>
    </div>
  );
}



export default connect()(RegisterComponent);
