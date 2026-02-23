import useInvoice from "../../hooks/useInvoice";
import { Box, Button, Text } from "@chakra-ui/react";
import useUpdateInvoice from "../../hooks/useUpdateInvoice";

const InvoiceList = () => {
  const { data, setData, isLoading, error } = useInvoice();
  const { update } = useUpdateInvoice();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoices</p>;
  if (!data || data.length === 0) return <p>No invoices found</p>;

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((invoice) => invoice.id !== id));
    }
  };
  return (
    <Box>
      {data.map((invoice) => (
        <Box key={invoice.id} bg="gray.100" p={4} borderRadius="md" mb={3}>
          <Text fontWeight="bold">{invoice.client}</Text>
          <Text fontSize="sm">{invoice.job_id}</Text>
          <Text fontSize="sm">{invoice.status}</Text>
          <Text fontSize="sm">{invoice.issue_date}</Text>
          <Text fontSize="sm">{invoice.due_date}</Text>
          <Button
            size="sm"
            colorScheme="gray"
            onClick={() => handleArchive(invoice.id)}
          >
            Archive
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default InvoiceList;
