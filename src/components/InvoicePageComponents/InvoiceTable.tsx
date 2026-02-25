import { Table, Button, Box, Text } from "@chakra-ui/react";
import useInvoice from "../../hooks/useInvoice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import usePatchInvoice from "../../hooks/usePatchInvoice";
import DataTableHeader from "../General/DataTableHeader";

const InvoiceTable = () => {
  const [showArchived, setShowArchived] = useState(false);
  const { data, isLoading, error, setData } = useInvoice(showArchived);
  const { update } = usePatchInvoice();
  const navigate = useNavigate();

  if (isLoading) return <Text>Loading invoices...</Text>;
  if (error) return <Text color="red.500">Error loading invoices</Text>;

  const handleArchive = async (id: number, status: boolean) => {
    {
      await update(id, { archived: !status });

      setData((prev) => prev.filter((invoice) => invoice.id !== id));
    }
  };

  return (
    <Box width="100%">
      <DataTableHeader
        children="Invoice"
        showArchived={showArchived}
        onCheckedChange={(e) => setShowArchived(e.checked)}
      />
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
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((invoice) => (
              <Table.Row
                key={invoice.id}
                _hover={{ bg: "gray.50", cursor: "pointer" }}
              >
                <Table.Cell fontWeight="bold">{invoice.number}</Table.Cell>
                <Table.Cell fontWeight="medium">
                  {invoice.client.name}
                </Table.Cell>
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
                      handleArchive(invoice.id, invoice.archived);
                    }}
                  >
                    {invoice.archived === false ? "Archive" : "Unarchive"}
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

export default InvoiceTable;
