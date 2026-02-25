import useData from "./Generic/useData";

interface QuoteClient {
  id: number | ""; 
  name: string;
}

export interface Quote{
    id: number;
    number: string;
    description: string;
    client: QuoteClient;
    issue_date: string;
    expiry_date: string;
    line_items: string;
    status: string;
    status_display: string;
}

const useQuotes = () => {
  return (useData<Quote>('quotes/', {}, []))
}

const useQuotesByClient = (clientId: string) => {
  return (useData<Quote>('quotes/', {params: {client: clientId}}, [clientId] ))
}

export default useQuotes
export { useQuotesByClient }