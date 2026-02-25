import usePatchData from "./Generic/usePatchData";


interface Patch {
    archived?: Boolean;
    status?: "draft" | "sent" | "paid" | "overdue";
    due_date?: string;
}

const usePatchInvoice = (onSuccess?: () => void) => {
  return usePatchData<Patch>({endpoint: "invoices", ...(onSuccess && { onSuccess })})
  
}

export default usePatchInvoice