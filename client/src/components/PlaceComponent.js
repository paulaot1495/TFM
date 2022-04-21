import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function PlaceComponent(props) {
  const [data, setData] = useState("");
  const {account, method, setStackId, buttonLabel, place} = props;

  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const txId = method.cacheSend(place, { from: account, gas: 3000000 })
    setStackId(txId);
  };


  return (
    <div>
      <form className="add-user-container" onSubmit={onSubmit}>
        <input className="add-user-button" type="submit" value={buttonLabel} />
      </form>
    </div>
  );
}


export default connect()(PlaceComponent);
