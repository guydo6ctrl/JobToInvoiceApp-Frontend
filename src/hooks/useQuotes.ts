import useData from './useData'

interface Quote{
    id: number;
    client: number;
    issue_date: string;
    expiry_date: string;
    line_items: string;
    status: string;
}

const useQuotes = () => {
  return (useData<Quote>('/quotes/', {}, []))
}

export default useQuotes