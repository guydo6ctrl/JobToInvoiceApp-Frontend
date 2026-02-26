import useData from "./Generic/useData";

interface ClientJob {
  id: number | '';
  name: string;
}
interface Job{
  id: number;
  number: string;
  title: string;
  description: string;
  status: string;
  status_display: string;
  client: ClientJob;
  source_quote: string;
  quote_number: string;
  date_created: string;
  archived: boolean;
}

const useJobs = (showArchived: boolean, searchText: string) => {
  return (useData<Job>('jobs/', {params: {archived: showArchived, search: searchText}}, [showArchived, searchText]))
}

const useJobsByClient = (clientId: string) => {
  return (useData<Job>('jobs/', {params: {client: clientId}}, [clientId] ))
}

export default useJobs
export { useJobsByClient }
