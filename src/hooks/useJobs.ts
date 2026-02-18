import useData from './useData';

interface Job{
    title: string;
    description: string;
    status: string;
    client_id: number;
    source_quote: string;
}

const useJobs = () => {
  return (useData<Job>('/jobs/', {}, []))
}

export default useJobs