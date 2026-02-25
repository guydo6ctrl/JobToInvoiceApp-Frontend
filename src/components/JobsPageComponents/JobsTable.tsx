import { Box, Button, Text, Badge, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import DataTableHeader from "../General/DataTableHeader";
import { useState } from "react";
import usePatchJob from "../../hooks/usePatchJob";

const JobsTable = () => {
  const [showArchived, setShowArchived] = useState(false);
  const { data: jobs, isLoading, error, setData } = useJobs(showArchived);
  const { update } = usePatchJob();
  const navigate = useNavigate();

  if (isLoading) return <Text>Loading jobs...</Text>;
  if (error) return <Text color="red.500">Error loading jobs</Text>;

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

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((quote) => quote.id !== id));
    }
  };

  return (
    <Box width="100%">
      <DataTableHeader
        children="Jobs"
        showArchived={showArchived}
        onCheckedChange={(e) => setShowArchived(e.checked)}
      />
      <Box bg="white" borderRadius="lg" shadow="md" overflow="hidden">
        <Table.Root>
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader>Number</Table.ColumnHeader>
              <Table.ColumnHeader>Client</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Created</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
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
                      handleArchive(job.id);
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
    </Box>
  );
};

export default JobsTable;
