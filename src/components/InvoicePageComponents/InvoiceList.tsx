import useInvoice from "../../hooks/useInvoice";
import { Badge, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import useUpdateInvoice from "../../hooks/usePatchInvoice";
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
    navigate(`/invoices/${id}`);
  };

  return (
    <Box>
      {displayedInvoices.map((invoice) => (
        <Box
          key={invoice.id}
          bg="white"
          p={5}
          borderRadius="lg"
          mb={4}
          shadow="md"
          cursor="pointer"
          _hover={{ shadow: "lg", transform: "scale(1.01)" }}
          transition="all 0.2s"
          onClick={() => handleClick(invoice.id)}
        >
          <HStack justifyContent="space-between" mb={2}>
            <VStack align="start" gap={0}>
              <Text fontWeight="bold" fontSize="lg">
                {invoice.client.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {invoice.number ?? invoice.id}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Job ID: {invoice.job_number ?? invoice.job_id}
              </Text>
            </VStack>
            <Badge
              colorScheme={
                invoice.status === "paid"
                  ? "green"
                  : invoice.status === "draft"
                    ? "yellow"
                    : invoice.status === "overdue"
                      ? "red"
                      : "blue"
              }
            >
              {invoice.status}
            </Badge>
          </HStack>

          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize="sm" color="gray.600">
              Issue: {invoice.issue_date}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Due: {invoice.due_date}
            </Text>
          </HStack>

          <HStack mt={3} justifyContent="flex-end" gap={2}>
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
            <Button
              size="sm"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(invoice.id);
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

export default InvoiceList;
