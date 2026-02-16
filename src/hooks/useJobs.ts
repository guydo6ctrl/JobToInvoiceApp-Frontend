import useData from './useData';

interface Job{
    id: number;
    title: string;
    description: string;
    date_created: string;
    completed: boolean;
    client_id: number;
}

const useJobs = () => {
  return (useData<Job>('/jobs/', {}, []))
}

export default useJobs