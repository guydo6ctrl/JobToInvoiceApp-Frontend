import {
  Box,
  Button,
  Table,
  Badge,
  Flex,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useQuotes from "../../hooks/useQuotes";
import { useState } from "react";
import usePatchQuote from "../../hooks/usePatchQuote";
import DataTableHeader from "../General/DataTableHeader";

const QuotesTable = () => {
  const [showArchived, setShowArchived] = useState(false);
  const {
    data: quotes = [],
    isLoading,
    error,
    setData,
  } = useQuotes(showArchived);
  const { update } = usePatchQuote();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading quotes...</p>;
  if (error) return <p>Error loading quotes</p>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "gray";
      case "sent":
        return "blue";
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((quote) => quote.id !== id));
    }
  };

  return (
    <Box width="100%">
      <DataTableHeader
        children="Quotes"
        showArchived={showArchived}
        onCheckedChange={(e) => setShowArchived(e.checked)}
      />
      <Box width="100%" boxShadow="md" borderRadius="md" overflowX="auto">
        <Table.Root>
          <Table.Header bg="gray.100">
            <Table.Row>
              <Table.ColumnHeader>Number</Table.ColumnHeader>
              <Table.ColumnHeader>Client</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Issue Date</Table.ColumnHeader>
              <Table.ColumnHeader>Expiry Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {quotes.map((quote) => (
              <Table.Row
                key={quote.id}
                _hover={{ bg: "gray.50", cursor: "pointer" }}
              >
                <Table.Cell fontWeight="bold">{quote.number}</Table.Cell>
                <Table.Cell fontWeight="medium">{quote.client.name}</Table.Cell>
                <Table.Cell>
                  <Badge colorScheme={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{quote.issue_date}</Table.Cell>
                <Table.Cell>{quote.expiry_date}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/quotes/${quote.id}`);
                    }}
                  >
                    View
                  </Button>
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
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default QuotesTable;
