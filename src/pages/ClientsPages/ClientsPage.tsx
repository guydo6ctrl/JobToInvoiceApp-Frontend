import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import AddClientForm from "../../components/ClientsPageComponents/AddClientForm";
import ClientsList from "../../components/ClientsPageComponents/ClientsList";

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
