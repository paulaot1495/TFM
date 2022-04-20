import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function AddRole(props) {
  const [data, setData] = useState("");
  const [stackId, setstackId] = useState("");
  const account = props.account;
  const method = props.method;
  const title = props.title;
  const owner = props.owner;
  const drizzleState = props.drizzleState;

  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const stackId = method(data)
      .send({ from: account, gas: 3000000 })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((error) => {
        console.log(error);
      });

    setstackId({stackId});
  };

  const getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;
  
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackId];
    console.log(txHash);
    console.log('AAAAAAAAAAAAA');
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
  
    // otherwise, return the transaction status
    console.log(`Transaction status: ${transactions[txHash] && transactions[txHash].status}`)
    console.log(`Transaction status: ${transactions[txHash] && transactions[txHash].status}`)
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
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
        <input className="add-user-button" type="submit" value="Crear" />
        <div>{getTxStatus()}</div>
      </form>
    </div>
  );
}

export default connect()(AddRole);
