import usePatchData from './Generic/usePatchData'
import { Patch } from './usePatchInvoice'

const usePatchQuote = (onSuccess?: () => void) => {
  return usePatchData<Patch>({endpoint: "quotes", ...(onSuccess && { onSuccess })})
  
}

export default usePatchQuote