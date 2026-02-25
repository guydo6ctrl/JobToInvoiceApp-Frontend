import { useNavigate } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import { Box, Text } from "@chakra-ui/react";
import JobCard from "./JobCard";
import usePatchJob from "../../hooks/usePatchJob";
import { useState } from "react";

interface Props {
  limit?: number;
}

const JobsList = ({ limit }: Props) => {
  const [showArchived] = useState(false);
  const { data, isLoading, error, setData } = useJobs(showArchived);
  const { update } = usePatchJob();
  const navigate = useNavigate();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error loading jobs</Text>;
  if (!data || data.length === 0) return <Text>No jobs found</Text>;

  const sortedJobs = [...data].sort((a, b) => {
    const dateA = new Date(a.date_created.split("-").reverse().join("-"));
    const dateB = new Date(b.date_created.split("-").reverse().join("-"));

    return dateB.getTime() - dateA.getTime();
  });

  const displayedJobs = limit ? sortedJobs.slice(0, limit) : data;

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((job) => job.id !== id));
    }
  };

  return (
    <Box>
      {displayedJobs.map((job) => (
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
