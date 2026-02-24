import { useParams } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import { Text } from "@chakra-ui/react";

const JobsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: jobs = [], isLoading, error } = useJobs();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error loading job</Text>;

  const job = jobs?.find((j) => j.id === Number(id));
  if (!job) return <p>Job not found</p>;

  return (
    <div>
      <h2>Job #{job.number}</h2>
    </div>
  );
};

export default JobsDetailPage;
