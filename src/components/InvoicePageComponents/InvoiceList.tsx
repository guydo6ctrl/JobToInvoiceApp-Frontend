import useInvoice from "../../hooks/useInvoice";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import useUpdateInvoice from "../../hooks/useUpdateInvoice";
import { useNavigate } from "react-router-dom";

interface Props {
  limit?: number;
}

const InvoiceList = ({ limit }: Props) => {
  const navigate = useNavigate();
  const { data, setData, isLoading, error } = useInvoice();
  const { update } = useUpdateInvoice();

  const sortedInvoices = [...data].sort((a, b) => {
    const dateA = new Date(a.issue_date.split("-").reverse().join("-"));
    const dateB = new Date(b.issue_date.split("-").reverse().join("-"));

    return dateB.getTime() - dateA.getTime();
  });

  const displayedInvoices = limit ? sortedInvoices.slice(0, limit) : data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoices</p>;
  if (!data || data.length === 0) return <p>No invoices found</p>;

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((invoice) => invoice.id !== id));
    }
  };

  const handleClick = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <Box>
      <HStack justifyContent="space-between" mb={3}>
        <Text fontSize="2xl" fontWeight="bold" flex={1}>
          Invoice List
        </Text>
        <Button
          size="sm"
          colorScheme="gray"
          onClick={(e) => e.stopPropagation()}
        >
          See All
        </Button>
      </HStack>

      {displayedInvoices.map((invoice) => (
        <Box
          key={invoice.id}
          bg="gray.100"
          p={4}
          borderRadius="md"
          mb={3}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
          onClick={() => handleClick(invoice.id)}
        >
          <Text fontWeight="bold">{invoice.client.name}</Text>
          <Text fontSize="bold">{invoice.job_id}</Text>
          <Text fontSize="sm">{invoice.status}</Text>
          <Text fontSize="sm">{invoice.issue_date}</Text>
          <Text fontSize="sm">{invoice.due_date}</Text>
          <Button
            size="sm"
            colorScheme="gray"
            onClick={(e) => {
              e.stopPropagation();
              handleArchive(invoice.id);
            }}
          >
            Archive
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default InvoiceList;
