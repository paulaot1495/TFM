import ManageRole from "./manageRole";
import MetamaskComponent from "./metamaskComponent";
import RolComponent from "./rolComponent";
import AddressToRole from "./AddressToRole";




import { connect } from "react-redux";

function AdminContainer(props) {
    const {rol, stackId, accountValue, drizzle, drizzleState, setStackId} = props;
    return (
      <div>
        <MetamaskComponent account={accountValue}></MetamaskComponent>
        <RolComponent rol={rol}></RolComponent>
        <AddressToRole
            drizzle={drizzle}
            buttonLabel='Transportista'
            rol='1'
        ></AddressToRole>
        <AddressToRole
            drizzle={drizzle}
            buttonLabel='Laboratorio'
            rol='2'
        ></AddressToRole>
        <AddressToRole
            drizzle={drizzle}
            buttonLabel='Centro'
            rol='3'
        ></AddressToRole>
        <ManageRole 
          stackId={stackId}
          buttonLabel='Añadir'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.addLaboratory}
          title="Añade un responsable del Laboratorio"
          role="lab"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
        <ManageRole
          stackId={stackId}
          buttonLabel='Eliminar'
          setStackId={setStackId}
          account={accountValue}
          method={drizzle.contracts.VaccineNetwork.methods.removeLaboratory}
          title="Elimina al responsable del Laboratorio"
          owner={drizzle.contracts.VaccineNetwork.options.from}
          drizzleState={drizzleState}>
        </ManageRole>
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
