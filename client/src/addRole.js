import React, { useEffect, useState } from "react";
import { useDrizzleContext } from "./drizzle/drizzleContext";

import { connect } from "react-redux";

function AddRole(props) {
  const drizzle = useDrizzleContext();
  const [data, setData] = useState("");
  const account = props.account;
  const method = props.method;
  const title = props.title;
  const owner = props.owner;

  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    method(data)
      .send({ from: account, gas: 3000000 })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
            {title}          
            <input value={data} onChange={onChange} />
        </label>
        <input type="submit" value="Crear" />
      </form>
    </div>
  );
}

export default connect()(AddRole);
