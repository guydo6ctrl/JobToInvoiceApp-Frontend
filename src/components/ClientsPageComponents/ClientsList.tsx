import {
  Badge,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useClients from "../../hooks/useClients";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import usePatchClient from "../../hooks/usePatchClient";
import { brand } from "../../constants";

interface Props {
  limit?: number;
}

const ClientsList = ({ limit }: Props) => {
  const [showArchived] = useState(false);
  const { data, isLoading, error, setData } = useClients(showArchived);
  const navigate = useNavigate();
  const { update } = usePatchClient();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading clients</Text>;
  if (!data || data.length === 0) return <Text>No clients found</Text>;

  const handleClick = (id: number) => {
    navigate(`/clients/${id}`);
  };

  const handleArchive = async (id: number) => {
    {
      await update(id, { archived: true });

      setData((prev) => prev.filter((client) => client.id !== id));
    }
  };

  const displayedClients = limit ? data.slice(0, limit) : data;

  return (
    <Box>
      {displayedClients.map((client) => (
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

            <Badge color="black" variant="subtle">
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
          <HStack mt={3} justifyContent="flex-end" gap={2}>
            <Button
              size="sm"
              colorPalette={brand}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(client.id);
              }}
            >
              View
            </Button>
            <Button
              size="sm"
              colorPalette="red"
              bg="red.500"
              onClick={(e) => {
                e.stopPropagation();
                handleArchive(client.id);
              }}
            >
              Archive
            </Button>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default ClientsList;
