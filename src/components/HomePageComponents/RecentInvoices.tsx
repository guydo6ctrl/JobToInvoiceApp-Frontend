import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import RowItem from "./RowItem";
import { useNavigate } from "react-router-dom";
import { RecentInvoice } from "../Interfaces/homeInterfaces";

interface Props {
  data: RecentInvoice[];
}

const RecentInvoices = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="lg"
      p={5}
    >
      <HStack justify="space-between" mb={4}>
        <Text
          fontSize="10px"
          fontWeight="700"
          letterSpacing="1.5px"
          textTransform="uppercase"
          color="gray.400"
        >
          Recent Invoices
        </Text>
        <Text
          fontSize="11px"
          color="blue.500"
          fontWeight="600"
          cursor="pointer"
          onClick={() => navigate("/invoices")}
          _hover={{ color: "blue.700" }}
        >
          View all →
        </Text>
      </HStack>

      {data.length === 0 ? (
        <Text fontSize="12px" color="gray.400" py={4} textAlign="center">
          No invoices yet
        </Text>
      ) : (
        <VStack align="stretch" gap={0}>
          {data.map((inv: RecentInvoice) => (
            <RowItem
              key={inv.id}
              number={inv.number}
              client={inv.client_name}
              amount={inv.total_due}
              status={inv.status}
              statusDisplay={inv.status_display}
              date={inv.due_date}
              dateLabel="Due"
              onClick={() => navigate(`/invoices/${inv.id}`)}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default RecentInvoices;
