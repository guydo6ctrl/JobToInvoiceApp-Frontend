import { Box, Button, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useClients from "../../hooks/useClients";
import { useState } from "react";
import DataTableHeader from "../General/DataTableHeader";
import usePatchClient from "../../hooks/usePatchClient";
import ArchiveButton from "../General/ArchiveButton";
import SearchInput from "../General/SearchInput";
import { brand } from "../../constants";

const ClientsTable = () => {
  const [showArchived, setShowArchived] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const {
    data: clients = [],
    isLoading,
    error,
    setData,
  } = useClients(showArchived, clientSearch);
  const { update } = usePatchClient();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading clients...</p>;
  if (error) return <p>Error loading clients</p>;

  const handleArchive = async (id: number, status: boolean) => {
    {
      await update(id, { archived: !status });

      setData((prev) => prev.filter((client) => client.id !== id));
    }
  };

  return (
    <Box>
      <Box mb={2}>
        <DataTableHeader
          children="Clients"
          showArchived={showArchived}
          onCheckedChange={(e) => setShowArchived(e.checked)}
        />
        <SearchInput
          onSearch={(searchText) => setClientSearch(searchText)}
          placeholder="Search by client..."
          maxW="500px"
        />
      </Box>
      <Box width="100%" boxShadow="md" borderRadius="md" overflowX="auto">
        <Table.Root>
          <Table.Header bg="gray.100">
            <Table.Row>
              <Table.ColumnHeader fontWeight="semibold">
                Name
              </Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Phone</Table.ColumnHeader>
              <Table.ColumnHeader>Address</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {clients.map((client) => (
              <Table.Row
                key={client.id}
                _hover={{ bg: "gray.50", cursor: "pointer" }}
              >
                <Table.Cell fontWeight="bold">{client.name}</Table.Cell>
                <Table.Cell>{client.email}</Table.Cell>
                <Table.Cell>{client.phone || "-"}</Table.Cell>
                <Table.Cell>
                  <Text truncate maxW="200px">
                    {client.address || "-"}
                  </Text>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    size="sm"
                    colorPalette={brand}
                    mr={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/clients/${client.id}`);
                    }}
                  >
                    View
                  </Button>
                  <ArchiveButton
                    id={client.id}
                    isArchived={client.archived}
                    onToggle={() => handleArchive(client.id, client.archived)}
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

export default ClientsTable;
