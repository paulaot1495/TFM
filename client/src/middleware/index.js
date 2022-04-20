import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzle/drizzleOptions'
import { toast } from 'react-toastify';
import CarrierRole from "../contracts/CarrierRole.json";


const contractEventNotifier = store => next => action => {
    if (action.type === 'CONTRACT_SYNCING') {
      toast.success('La transacción ha ido bien', { position: toast.POSITION.TOP_RIGHT })
    } else if (false) {
       toast.error('Ha habido un error', { position: toast.POSITION.TOP_RIGHT })
    }
    return next(action)
  }

const appMiddlewares = [ contractEventNotifier ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  contracts: [CarrierRole],
  events: {
    CarrierRole: ['carrierAdded'],
},
  disableReduxDevTools: false  // enable ReduxDevTools!
})