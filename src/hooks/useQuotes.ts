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
    archived: boolean
}

const useQuotes = (showArchived: boolean, clientSearch: string) => {
  return (useData<Quote>('quotes/', {params: {archived: showArchived, client_name: clientSearch}}, [showArchived, clientSearch]))
}

const useQuotesByClient = (clientId: string) => {
  return (useData<Quote>('quotes/', {params: {client: clientId},}, [clientId] ))
}

export default useQuotes
export { useQuotesByClient }