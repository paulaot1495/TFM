import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function AddressToRole(props) {
  const [accountKey, setAccount] = useState("");
  const {drizzle, buttonLabel, rol, contract} = props;
  let addressValue;
  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const a = drizzle.contracts.VaccineNetwork.methods.getRoleAccount.cacheCall(rol);
    setAccount(a);
  };

  const getAddress = () => {
    if(contract && contract.getRoleAccount && contract.getRoleAccount[accountKey]) {
      if(contract.getRoleAccount[accountKey].value === '0x0000000000000000000000000000000000000000'){
        return '⮕ Aun no tienes a ningun usuario registrado para este rol.';
      } else {
        return `⮕ ${contract.getRoleAccount[accountKey].value}`;
      }
    }
  }

  return (
    <div>
      <form className="generic-view" onSubmit={onSubmit}>
        <label className="add-user-label">      
        </label>
        <input className="generic-view-button" type="submit" value={buttonLabel} />
        <div className='generic-view-text'>{getAddress()}</div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      contract: state.contracts.VaccineNetwork
    };
};


export default connect(mapStateToProps)(AddressToRole);
