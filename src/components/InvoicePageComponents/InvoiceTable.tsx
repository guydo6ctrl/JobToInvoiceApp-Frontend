import { Table, Button, Box, Text } from "@chakra-ui/react";
import useInvoice from "../../hooks/useInvoice";
import { useNavigate } from "react-router-dom";

const InvoiceTable = () => {
  const { data, isLoading, error } = useInvoice();
  const navigate = useNavigate();

  if (isLoading) return <Text>Loading invoices...</Text>;
  if (error) return <Text color="red.500">Error loading invoices</Text>;
  if (!data || data.length === 0) return <Text>No invoices found</Text>;

  return (
    <Box width="100%" boxShadow="md" borderRadius="md" overflowX="auto">
      <Table.Root>
        <Table.Header bg="gray.100">
          <Table.Row>
            <Table.ColumnHeader>Number</Table.ColumnHeader>
            <Table.ColumnHeader>Client</Table.ColumnHeader>
            <Table.ColumnHeader>Job</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Issue Date</Table.ColumnHeader>
            <Table.ColumnHeader>Due Date</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((invoice) => (
            <Table.Row
              key={invoice.id}
              _hover={{ bg: "gray.50", cursor: "pointer" }}
            >
              <Table.Cell fontWeight="bold">{invoice.number}</Table.Cell>
              <Table.Cell fontWeight="medium">{invoice.client.name}</Table.Cell>
              <Table.Cell>{invoice.job_number}</Table.Cell>
              <Table.Cell>{invoice.status}</Table.Cell>
              <Table.Cell>{invoice.issue_date}</Table.Cell>
              <Table.Cell>{invoice.due_date}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  size="sm"
                  colorScheme="blue"
                  mr={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/invoices/${invoice.id}`);
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

export default InvoiceTable;
