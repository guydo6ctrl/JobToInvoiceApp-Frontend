import usePatchData from "./Generic/usePatchData";


export interface Patch {
    archived?: Boolean;
}

const usePatchInvoice = (onSuccess?: () => void) => {
  return usePatchData<Patch>({endpoint: "invoices", ...(onSuccess && { onSuccess })})
  
}

export default usePatchInvoice