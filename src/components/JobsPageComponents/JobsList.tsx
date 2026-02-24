import { useNavigate } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import { Box, Text } from "@chakra-ui/react";
import JobCard from "./JobCard";

const JobsList = () => {
  const { data, isLoading, error } = useJobs();
  const navigate = useNavigate();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error loading jobs</Text>;
  if (!data || data.length === 0) return <Text>No jobs found</Text>;

  const handleArchive = (id: number) => {
    // TODO: implement archive
  };

  return (
    <Box>
      {data.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onView={(id) => navigate(`/jobs/${id}`)}
          onArchive={handleArchive}
        />
      ))}
    </Box>
  );
};

export default JobsList;
