import { generateStore } from '@drizzle/store'
import drizzleOptions from '../drizzle/drizzleOptions'
import CarrierRole from "../contracts/CarrierRole.json";


const appMiddlewares = [ ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  contracts: [CarrierRole],
  disableReduxDevTools: false 
});