import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import RowItem from "./RowItem";
import { useNavigate } from "react-router-dom";
import { RecentQuote } from "../../Interfaces/homeInterfaces";

interface Props {
  data: RecentQuote[];
}

const RecentQuotes = ({ data }: Props) => {
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
          Recent Quotes
        </Text>
        <Text
          fontSize="11px"
          color="blue.500"
          fontWeight="600"
          cursor="pointer"
          onClick={() => navigate("/quotes")}
          _hover={{ color: "blue.700" }}
        >
          View all →
        </Text>
      </HStack>

      {data.length === 0 ? (
        <Text fontSize="12px" color="gray.400" py={4} textAlign="center">
          No quotes yet
        </Text>
      ) : (
        <VStack align="stretch" gap={0}>
          {data.map((q) => (
            <RowItem
              key={q.id}
              number={q.number}
              client={q.client_name}
              amount={q.quote_total}
              status={q.status}
              statusDisplay={q.status_display}
              date={q.expiry_date}
              dateLabel="Expires"
              onClick={() => navigate(`/quotes/${q.id}`)}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default RecentQuotes;
