import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function SetComponent(props) {
    const [data, setData] = useState("");
    const {drizzle, setStackId, account} = props;

    useEffect(() => {
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const  txId= drizzle.contracts.VaccineNetwork.methods.compareTemperatures.cacheSend(data, { from: account, gas: 3000000});
        setStackId(txId);
      };
    
      const onChange = (event) => {
        setData(event.target.value);
      };


    return (
        <div>
        <form className="generic-view" onSubmit={onSubmit}>
            <input className="generic-view-button" type="submit" value='Temperatura actual:' />
            <input className="value-input" onChange={onChange} />  
        </form>
      </div>
    );
}


export default connect()(SetComponent);
