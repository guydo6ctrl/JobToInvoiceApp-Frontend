import useInvoice from "../../hooks/useInvoice";
import { Box, Text } from "@chakra-ui/react";

const InvoiceList = () => {
  const { data, isLoading, error } = useInvoice();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoices</p>;
  if (!data || data.length === 0) return <p>No invoices found</p>;

  return (
    <Box>
      {data.map((invoice) => (
        <Box key={invoice.id} bg="gray.100" p={4} borderRadius="md" mb={3}>
          <Text fontWeight="bold">{invoice.client}</Text>
          <Text fontSize="sm">{invoice.job_id}</Text>
          <Text fontSize="sm">{invoice.status}</Text>
          <Text fontSize="sm">{invoice.issue_date}</Text>
          <Text fontSize="sm">{invoice.due_date}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default InvoiceList;
