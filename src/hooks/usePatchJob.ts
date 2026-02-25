import usePatchData from './Generic/usePatchData'
import { Patch } from './usePatchInvoice'

const usePatchJob = (onSuccess?: () => void) => {
  return usePatchData<Patch>({endpoint: "jobs", ...(onSuccess && { onSuccess })})
  
}

export default usePatchJob