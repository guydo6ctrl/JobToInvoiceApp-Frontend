import { useNavigate } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import { Badge, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

const JobsList = () => {
  const { data, isLoading, error } = useJobs();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;
  if (!data || data.length === 0) return <p>No jobs found</p>;

  const handleClick = (id: number) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <Box>
      {data.map((job) => (
        <Box
          key={job.id}
          bg="white"
          p={5}
          borderRadius="lg"
          mb={4}
          shadow="md"
          cursor="pointer"
          _hover={{ shadow: "lg", transform: "scale(1.01)" }}
          transition="all 0.2s"
          onClick={() => handleClick(job.id)}
        >
          <HStack justifyContent="space-between" mb={2}>
            <VStack align="start" gap={0}>
              <Text fontWeight="bold" fontSize="lg">
                {job.client.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Title: {job.title}
              </Text>
            </VStack>

            <Badge
              colorScheme={
                job.status === "completed"
                  ? "green"
                  : job.status === "in-progress"
                    ? "yellow"
                    : job.status === "cancelled"
                      ? "red"
                      : "blue"
              }
            >
              {job.status}
            </Badge>
          </HStack>

          <Text fontSize="sm" color="gray.600" mb={2}>
            {job.description}
          </Text>

          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize="sm" color="gray.600">
              Source Quote: #{job.source_quote}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Job ID: {job.number ?? job.id}
            </Text>
          </HStack>

          <HStack mt={3} justifyContent="flex-end" gap={2}>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={(e) => {
                e.stopPropagation();
                handleArchive(job.id);
              }}
            >
              Archive
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(job.id);
              }}
            >
              View
            </Button>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default JobsList;
