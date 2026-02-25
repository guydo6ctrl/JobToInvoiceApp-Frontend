import useData from "./Generic/useData";

interface InvoiceClient{
  id: number | '';
  name: string;
}

interface Invoice{
    id: number;
    number: string;
    client: InvoiceClient;
    source_quote: number;
    issue_date: string;
    due_date: string;
    status: string;
    status_display: string;
    job_id: number;
    job_number: string;
    archived: boolean;
}

const useInvoice = (showArchived: boolean) => {
  return (useData<Invoice>('invoices/', {params: {archived: showArchived}}, [showArchived]))
}

export default useInvoice