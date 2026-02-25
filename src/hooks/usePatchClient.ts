import usePatchData from './Generic/usePatchData'
import { Patch } from './usePatchInvoice'

const usePatchClient = (onSuccess?: () => void) => {
  return usePatchData<Patch>({endpoint: "clients", ...(onSuccess && { onSuccess })})
  
}

export default usePatchClient