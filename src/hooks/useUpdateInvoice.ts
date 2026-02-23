import useUpdateData from './Generic/useUpdateData'

interface UpdateInvoice {
    archived?: Boolean;
    status?: "draft" | "sent" | "paid" | "overdue";
    due_date?: string;
}

const useUpdateInvoice = (onSuccess?: () => void) => {
  return useUpdateData<UpdateInvoice>({endpoint: "invoices", ...(onSuccess && { onSuccess })})
  
}

export default useUpdateInvoice