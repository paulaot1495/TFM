import MethodComponent from "./MethodComponent";
import GenericContainer from "./GenericContainer";
import AddressToRole from "./AddressToRole";
import CarrierPoints from "./CarrierPoints";



import { connect } from "react-redux";

function AdminContainer(props) {
    const {rol, stackId, accountValue, drizzle, rolId, drizzleState, setStackId, transactionStack, transactions, vaccineId} = props;
    return (
      <div>
        <GenericContainer 
        stackId = {stackId}
        setStackId={setStackId}
        accountValue={accountValue}
        drizzle = {drizzle}
        drizzleState = {drizzleState}
        rol = {rol}
        rolId = {rolId}
        transactions = {transactions}
        transactionStack = {transactionStack}
        vaccineId = {vaccineId}
        />
        <AddressToRole
            drizzle={drizzle}
            buttonLabel='Transportista'
            rol='2'
        ></AddressToRole>
        <AddressToRole
            drizzle={drizzle}
            buttonLabel='Responsable CV'
            rol='3'
        ></AddressToRole>
        <CarrierPoints
            drizzle={drizzle}
            title="Consulta los puntos del transportista antes de añadirle a la cadena"
            buttonLabel='Consultar'
            rol='3'
        ></CarrierPoints>
        <MethodComponent 
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addCarrier}
          title="Añade un transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </MethodComponent>
        <MethodComponent
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeCarrier}
          title="Elimina al transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </MethodComponent>
        <MethodComponent
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addVaccineCenter}
          title="Añade un responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </MethodComponent>
        <MethodComponent
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeVaccineCenter}
          title="Elimina al responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </MethodComponent>
        <MethodComponent
          stackId={stackId}
          buttonLabel='Asociar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addDevice}
          title="Asocia un dispositivo a este lote"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </MethodComponent>
        <MethodComponent
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeDevice}
          title="Elimina el dispositivo asociado a este lote"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </MethodComponent>
      </div>
    );
}


export default connect()(AdminContainer);
