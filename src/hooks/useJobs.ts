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
}

const useJobs = (showArchived: boolean) => {
  return (useData<Job>('jobs/', {params: {archived: showArchived}}, [showArchived]))
}

const useJobsByClient = (clientId: string) => {
  return (useData<Job>('jobs/', {params: {client: clientId}}, [clientId] ))
}

export default useJobs
export { useJobsByClient }
