import useData from "./useData"

interface Invoice{
    id: number;
    issue_date: string;
    due_date: string;
    status: string;
    job_id: number;
}

const useInvoice = () => {
  return (useData<Invoice>('/invoices/', {}, []))
}

export default useInvoice