import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import AddClientForm from "../components/Clients Page/AddClientForm";
import ClientsList from "../components/Clients Page/ClientsList";

const ClientsPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <Box>
        <ClientsList />
      </Box>
      <Box>
        <AddClientForm endpoint="clients" />
      </Box>
    </SimpleGrid>
  );
};
export default ClientsPage;
