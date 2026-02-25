import {
  Badge,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useQuotes from "../../hooks/useQuotes";
import { useNavigate } from "react-router-dom";
import usePatchQuote from "../../hooks/usePatchQuote";
import { useState } from "react";

interface Props {
  limit?: number;
}

const QuotesList = ({ limit }: Props) => {
  const [showArchived] = useState(false);
  const { data, isLoading, error, setData } = useQuotes(showArchived);
  const { update } = usePatchQuote();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading quotes</Text>;
  if (!data || data.length === 0) return <Text>No quotes found</Text>;

  const sortedQuotes = [...data].sort((a, b) => {
    const dateA = new Date(a.issue_date.split("-").reverse().join("-"));
    const dateB = new Date(b.issue_date.split("-").reverse().join("-"));

    return dateB.getTime() - dateA.getTime();
  });

  const displayedQuotes = limit ? sortedQuotes.slice(0, limit) : data;

  const handleClick = (id: number) => {
    navigate(`/quotes/${id}`);
  };

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((quote) => quote.id !== id));
    }
  };


  return (
    <Box>
      {displayedQuotes.map((quote) => (
        <Box
          key={quote.id}
          bg="white"
          p={5}
          borderRadius="lg"
          mb={4}
          shadow="md"
          cursor="pointer"
          _hover={{ shadow: "lg", transform: "scale(1.01)" }}
          transition="all 0.2s"
          onClick={() => handleClick?.(quote.id)}
        >
          {/* Header */}
          <HStack justifyContent="space-between" mb={2}>
            <VStack align="start" gap={0}>
              <Text fontWeight="bold" fontSize="lg">
                {quote.client.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {quote.number ?? quote.id}
              </Text>
            </VStack>

            <Badge
              bg={
                quote.status === "accepted"
                  ? "green.300"
                  : quote.status === "draft"
                    ? "blue.300"
                    : quote.status === "rejected"
                      ? "red.300"
                      : "yellow.300"
              }
            >
              {quote.status_display}
            </Badge>
          </HStack>

          {/* Dates */}
          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize="sm" color="gray.600">
              Issued: {quote.issue_date}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Expires: {quote.expiry_date}
            </Text>
          </HStack>

          {/* Actions */}
          <HStack mt={3} justifyContent="flex-end" gap={2}>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={(e) => {
                e.stopPropagation();
                handleArchive(quote.id);
              }}
            >
              Archive
            </Button>

            <Button
              size="sm"
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleClick?.(quote.id);
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

export default QuotesList;
