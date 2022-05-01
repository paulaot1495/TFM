import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function GetComponent(props) {
    const [idPlace, setIdPlace] = useState("");
    const [idState, setIdState] = useState("");
    const [stateValue, setStateValue] = useState("");
    const [placeValue, setPlaceValue] = useState("");
    const {drizzle, contract} = props;

    useEffect(() => {
    }, []);

    const onSubmitState = (event) => {
        event.preventDefault();
        const x = drizzle.contracts.VaccineNetwork.methods.getVacccineState.cacheCall(idState);
        setStateValue(x);
    };

    const onSubmitPlace = (event) => {
        event.preventDefault();
        const x = drizzle.contracts.VaccineNetwork.methods.getVacccinePlace.cacheCall(idPlace);
        setPlaceValue(x);
    };

    const getValueState = () => {
        if(stateValue && contract && contract.getVacccineState && contract.getVacccineState[stateValue]) {
            if(contract.getVacccineState[stateValue].value){
                const states = {
                    0: 'Este lote no existe en el sistema',
                    1: 'El lote está en tránsito', 
                    2: 'Este lote está listo para administrarse',
                    3: 'Este lote no ha preservado la cadena de frío y debe ser descartado'
                  }
                return `⮕ ${states[contract.getVacccineState[stateValue].value]}`
            } else {
                return '⮕ Este lote no ha sido gestionado por la red todavía'
            }
        }
    }

    const getValuePlace = () => {
        if(placeValue && contract && contract.getVacccinePlace && contract.getVacccinePlace[placeValue]) {
            if(contract.getVacccinePlace[placeValue].value){
                const places = {
                    0: 'Este lote no ha sido gestionado por la red todavía',
                    1: 'El lote está en el Laboratorio', 
                    2: 'El lote está en reparto',
                    3: 'El lote está en el Centro de vacunación'
                  }
                return `⮕ ${places[contract.getVacccinePlace[placeValue].value]}`
            } else {
                return '⮕ Este lote no ha sido gestionado por la red todavía'
            }
        }
    }


    const onChangeState = (event) => {
        setIdState(event.target.value);
    };

    const onChangePlace = (event) => {
        setIdPlace(event.target.value);
    };


    return (
        <div>
            <div>
                <form className="generic-view" onSubmit={onSubmitState}>
                <label className="add-user-label">       
                <input className="generic-view-button" type="submit" value='Estado del lote:' />
                    <input className="value-input" value={idState} onChange={onChangeState} />                </label>
                    <div className='generic-view-text'>{getValueState()}</div>
                </form>
            </div>
            <div>
                <form className="generic-view" onSubmit={onSubmitPlace}>
                <label className="add-user-label">      
                    <input className="generic-view-button" type="submit" value='Localización del lote:' />
                    <input className="value-input" value={idPlace} onChange={onChangePlace} />
                </label>
                    <div className='generic-view-text'>{getValuePlace()}</div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      contract: state.contracts.VaccineNetwork
    };
};


export default connect(mapStateToProps)(GetComponent);
