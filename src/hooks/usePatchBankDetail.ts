import usePatchData from './Generic/usePatchData'
import { Patch } from './usePatchInvoice'
interface PatchBankDetail {
  is_default: boolean;
}
const usePatchBankDetail = (onSuccess?: () => void) => {
  return usePatchData<PatchBankDetail>({endpoint: "company/bank", ...(onSuccess && { onSuccess })})
  
}

export default usePatchBankDetail