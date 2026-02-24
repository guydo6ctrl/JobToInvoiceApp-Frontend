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
    job_id: number;
    job_number: string;
}

const useInvoice = () => {
  return (useData<Invoice>('invoices/', {}, []))
}

export default useInvoice