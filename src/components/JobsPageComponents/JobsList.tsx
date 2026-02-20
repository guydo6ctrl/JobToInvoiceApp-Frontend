import useJobs from "../../hooks/useJobs";
import { Box, Text } from "@chakra-ui/react";

const JobsList = () => {
  const { data, isLoading, error } = useJobs();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;
  if (!data || data.length === 0) return <p>No jobs found</p>;

  return (
    <Box>
      {data.map((job) => (
        <Box key={job.id} bg="gray.100" p={4} borderRadius="md" mb={3}>
          <Text fontWeight="bold">{job.client}</Text>
          <Text fontWeight="bold">{job.title}</Text>
          <Text fontSize="sm">{job.description}</Text>
          <Text fontSize="sm">Source Quote #{job.source_quote}</Text>
          <Text fontSize="sm">{job.status}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default JobsList;
