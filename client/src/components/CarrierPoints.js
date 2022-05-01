import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function CarrierPoints(props) {
  const [data, setData] = useState("");
  const [points, setPoints] = useState("");
  const {drizzle, buttonLabel, title, contract} = props;
  let addressValue;
  useEffect(() => {
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const a = drizzle.contracts.VaccineNetwork.methods.getCarrierPoints.cacheCall(data);
    setPoints(a);
  };

  const getValuePoints = () => {
    if(points && contract && contract.getCarrierPoints && contract.getCarrierPoints[points]) {
        if(contract.getCarrierPoints[points].value[0] === '0' && contract.getCarrierPoints[points].value[1] === '0'){
            return 'Este usuario no ha sido registrado aún como transportista por el sistema.'
        } else {
            return  `Número de viajes ⮕ ${contract.getCarrierPoints[points].value[1]} \n Puntuación ⮕ ${contract.getCarrierPoints[points].value[0]} \n`
        }
    }
  };

  const onChange = (event) => {
    setData(event.target.value);
  };

  return (
<div>
      <form className="carrier-points-container" onSubmit={onSubmit}>
        <label className="carrier-points-label">
            {title}          
            <input className="carrier-input" value={data} onChange={onChange} />
        </label>
        <input className="carrier-points-button" type="submit" value={buttonLabel} />
        <div className='carrier-points-view-text'>{getValuePoints()}</div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      contract: state.contracts.VaccineNetwork
    };
};


export default connect(mapStateToProps)(CarrierPoints);
