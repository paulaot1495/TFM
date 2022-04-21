import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function ManageRole(props) {
  const [data, setData] = useState("");
  const {account, method, title, setStackId, buttonLabel} = props;

  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const txId = method.cacheSend(data, { from: account, gas: 3000000 })
    setStackId(txId);
  };


  const onChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <form className="add-user-container" onSubmit={onSubmit}>
        <label className="add-user-label">
            {title}          
            <input className="account-input" value={data} onChange={onChange} />
        </label>
        <input className="add-user-button" type="submit" value={buttonLabel} />
      </form>
    </div>
  );
}


export default connect()(ManageRole);
