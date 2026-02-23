import useData from "./Generic/useData";

interface ClientJob {
  id: number | '';
  name: string;
}
interface Job{
  id: number;
  title: string;
  description: string;
  status: string;
  client: ClientJob;
  source_quote: string;
}

const useJobs = () => {
  return (useData<Job>('jobs/', {}, []))
}

const useJobsByClient = (clientId: string) => {
  return (useData<Job>('quotes/', {params: {client: clientId}}, [clientId] ))
}

export default useJobs
export { useJobsByClient }
