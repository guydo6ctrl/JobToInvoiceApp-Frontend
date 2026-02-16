import useData from './useData'

interface Quote{
    id: number;
    issue_date: string;
    expiry_date: string;
    job_id: number;
    status: string;
}

const useQuotes = () => {
  return (useData<Quote>('/quotes/', {}, []))
}

export default useQuotes