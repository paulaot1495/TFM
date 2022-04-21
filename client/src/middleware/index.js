import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzle/drizzleOptions'
import { toast } from 'react-toastify';
import CarrierRole from "../contracts/CarrierRole.json";

const appMiddlewares = [ ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  contracts: [CarrierRole],
  disableReduxDevTools: false  // enable ReduxDevTools!
})