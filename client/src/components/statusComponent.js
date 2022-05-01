import React, { useEffect } from "react";
import { connect } from "react-redux";

function StatusComponent(props) {
  const {account, method, setStackId, buttonLabel, classType} = props;

  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const txId = method.cacheSend({ from: account, gas: 3000000 })
    setStackId(txId);
  };


  return (
    <div>
      <form className={classType} onSubmit={onSubmit}>
        <input  type="submit" value={buttonLabel} />
      </form>
    </div>
  );
}


export default connect()(StatusComponent);
