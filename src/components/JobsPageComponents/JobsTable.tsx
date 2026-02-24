import { Box, Button, Text, Badge, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useJobs from "../../hooks/useJobs";

const JobsTable = () => {
  const { data: jobs, isLoading, error } = useJobs();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "scheduled":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "yellow";
    }
  };

  return (
    <Box bg="white" borderRadius="lg" shadow="md" overflow="hidden">
      <Table.Root>
        <Table.Header bg="gray.50">
          <Table.Row>
            <Table.ColumnHeader>Number</Table.ColumnHeader>
            <Table.ColumnHeader>Client</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Created</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobs.map((job) => (
            <Table.Row
              key={job.id}
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <Table.Cell fontWeight="bold">{job.number}</Table.Cell>
              <Table.Cell>
                <Text fontWeight="medium">{job.client.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{job.title}</Text>
              </Table.Cell>
              <Table.Cell>
                <Badge colorScheme={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
              </Table.Cell>
              <Table.Cell fontSize="sm" color="gray.600">
                {new Date(job.date_created).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  size="sm"
                  colorScheme="blue"
                  mr={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/jobs/${job.id}`);
                  }}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  colorScheme="gray"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: call archive function
                  }}
                >
                  Archive
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default JobsTable;
