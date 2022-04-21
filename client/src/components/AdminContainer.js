import ManageRole from "./manageRole";
import GenericContainer from "./GenericContainer";
import AddressToRole from "./AddressToRole";




import { connect } from "react-redux";

function AdminContainer(props) {
    const {rol, stackId, accountValue, drizzle, rolId, drizzleState, setStackId} = props;
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
        <ManageRole 
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addCarrier}
          title="Añade un transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeCarrier}
          title="Elimina al transportista"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addVaccineCenter}
          title="Añade un responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeVaccineCenter}
          title="Elimina al responsable del Centro de Salud"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
      </div>
    );
}


export default connect()(AdminContainer);
