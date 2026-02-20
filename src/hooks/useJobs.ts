import useData from "./Generic/useData";

interface Job{
  id: number;
  title: string;
  description: string;
  status: string;
  client: number;
  source_quote: string;
}

const useJobs = () => {
  return (useData<Job>('/jobs/', {}, []))
}

export default useJobs