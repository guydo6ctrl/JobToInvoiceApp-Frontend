import { Box, Spinner, Text } from "@chakra-ui/react";
import useClients from "../hooks/useClients";

const ClientsList = () => {
  const { data, isLoading, error } = useClients();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading clients</Text>;
  if (!data || data.length === 0) return <Text>No clients found</Text>;

  return (
    <Box>
      {data.map((client) => (
        <Box key={client.name} bg="gray.700" p={4} borderRadius="md" mb={3}>
          <Text fontWeight="bold">{client.name}</Text>
          <Text fontSize="sm" color="gray.400">
            {client.email}
          </Text>
          {client.phone && <Text fontSize="sm">{client.phone}</Text>}
          {client.address && <Text fontSize="sm">{client.address}</Text>}
        </Box>
      ))}
    </Box>
  );
};

export default ClientsList;
