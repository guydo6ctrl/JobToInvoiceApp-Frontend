import { Badge, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

interface JobCardProps {
  job: any;
  onView: (id: number) => void;
  onArchive: (id: number) => void;
}

const JobCard = ({ job, onView, onArchive }: JobCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "yellow";
      case "cancelled":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Box
      bg="white"
      p={5}
      borderRadius="lg"
      mb={4}
      shadow="md"
      cursor="pointer"
      _hover={{ shadow: "lg", transform: "scale(1.01)" }}
      transition="all 0.2s"
      onClick={() => onView(job.id)}
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
        <Badge colorScheme={getStatusColor(job.status)}>{job.status}</Badge>
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
            onArchive(job.id);
          }}
        >
          Archive
        </Button>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={(e) => {
            e.stopPropagation();
            onView(job.id);
          }}
        >
          View
        </Button>
      </HStack>
    </Box>
  );
};

export default JobCard;
