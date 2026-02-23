import useData from "./Generic/useData";

interface Invoice{
  id: number;
    client: number;
    source_quote: number;
    issue_date: string;
    due_date: string;
    status: string;
    job_id: number;
}

const useInvoice = () => {
  return (useData<Invoice>('invoices/', {}, []))
}

export default useInvoice