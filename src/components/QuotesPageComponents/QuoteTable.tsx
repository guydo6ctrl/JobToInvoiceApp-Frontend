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
import ArchiveButton from "../General/ArchiveButton";
import SearchInput from "../General/SearchInput";
import { brand } from "../../constants";

const QuotesTable = () => {
  const [showArchived, setShowArchived] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const {
    data: quotes = [],
    isLoading,
    error,
    setData,
  } = useQuotes(showArchived, clientSearch);
  const { update } = usePatchQuote();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading quotes...</p>;
  if (error) return <p>Error loading quotes</p>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "yellow.300";
      case "sent":
        return "blue.300";
      case "accepted":
        return "green.300";
      case "rejected":
        return "red.300";
      default:
        return "gray";
    }
  };

  const handleArchive = async (id: number, status: boolean) => {
    {
      await update(id, { archived: !status });

      setData((prev) => prev.filter((quote) => quote.id !== id));
    }
  };

  return (
    <Box width="100%">
      <Box mb={2}>
        <DataTableHeader
          children="Quotes"
          showArchived={showArchived}
          onCheckedChange={(e) => setShowArchived(e.checked)}
        />
        <SearchInput
          onSearch={(searchText) => setClientSearch(searchText)}
          placeholder="Search by client/ quote number/ status..."
          maxW="500px"
        />
      </Box>

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
                <Table.Cell fontWeight="medium">
                  £{quote.quote_total}
                </Table.Cell>
                <Table.Cell>
                  <Badge bg={getStatusColor(quote.status)}>
                    {quote.status_display}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{quote.issue_date}</Table.Cell>
                <Table.Cell>{quote.expiry_date}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    size="sm"
                    colorPalette={brand}
                    mr={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/quotes/${quote.id}`);
                    }}
                  >
                    View
                  </Button>
                  <ArchiveButton
                    id={quote.id}
                    isArchived={quote.archived}
                    onToggle={() => handleArchive(quote.id, quote.archived)}
                  />
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
