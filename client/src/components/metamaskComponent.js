import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

function MetamaskComponent(props) {
  const account = props.account;

  useEffect(() => {
  }, []);

  return (
    <div id="metamask">
        <h2>Estas usando la cuenta</h2>
        <h3>{account}</h3>
    </div>
  );
}

export default connect()(MetamaskComponent);
