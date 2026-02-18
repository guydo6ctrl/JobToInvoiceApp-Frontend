import { Box, Spinner, Text } from "@chakra-ui/react";
import useQuotes from "../hooks/useQuotes";

const QuotesList = () => {
  const { data, isLoading, error } = useQuotes();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading quotes</Text>;
  if (!data || data.length === 0) return <Text>No quotes found</Text>;

  return (
    <Box>
      {data.map((quote) => (
        <Box key={quote.id} bg="gray.100" p={4} borderRadius="md" mb={3}>
          <Text fontWeight="bold">{quote.client}</Text>
          <Text fontSize="sm">{quote.status}</Text>
          <Text fontSize="sm">{quote.issue_date}</Text>
          <Text fontSize="sm">{quote.expiry_date}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default QuotesList;
