import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import AddClientForm from "../components/AddClientForm";
import ClientsList from "../components/ClientsList";

const ClientsPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <Box>
        <ClientsList />
      </Box>
      <Box>
        <AddClientForm />
      </Box>
    </SimpleGrid>
  );
};
export default ClientsPage;
