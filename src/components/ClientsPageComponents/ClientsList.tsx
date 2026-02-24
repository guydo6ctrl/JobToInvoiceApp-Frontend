import { Badge, Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import useClients from "../../hooks/useClients";
import { useNavigate } from "react-router-dom";

const ClientsList = () => {
  const { data, isLoading, error } = useClients();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading clients</Text>;
  if (!data || data.length === 0) return <Text>No clients found</Text>;

  const handleClick = (id: number) => {
    navigate(`/clients/${id}`);
  };

  return (
    <Box>
      {data.map((client) => (
        <Box
          key={client.id}
          bg="white"
          p={5}
          borderRadius="lg"
          mb={4}
          shadow="md"
          cursor="pointer"
          _hover={{ shadow: "lg", transform: "scale(1.01)" }}
          transition="all 0.2s"
          onClick={() => handleClick(client.id)}
        >
          {/* Header */}
          <HStack justifyContent="space-between" mb={2}>
            <Text fontWeight="bold" fontSize="lg">
              {client.name}
            </Text>

            <Badge colorScheme="blue" variant="subtle">
              Client
            </Badge>
          </HStack>

          {/* Details */}
          <VStack align="start" gap={1}>
            <Text fontSize="sm" color="gray.600">
              {client.email}
            </Text>

            {client.phone && (
              <Text fontSize="sm" color="gray.600">
                📞 {client.phone}
              </Text>
            )}

            {client.address && (
              <Text fontSize="sm" color="gray.500">
                {client.address}
              </Text>
            )}
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default ClientsList;
