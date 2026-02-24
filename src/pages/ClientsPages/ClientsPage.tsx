import { Box, GridItem, HStack, SimpleGrid } from "@chakra-ui/react";
import AddClientForm from "../../components/ClientsPageComponents/AddClientForm";
import ClientsList from "../../components/ClientsPageComponents/ClientsList";
import TitleSeeAll from "../../components/General/TitleSeeAll";

const ClientsPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} gap="40px">
      <GridItem colSpan={{ base: 1, lg: 1 }}>
        <TitleSeeAll children="Clients List" />
        <ClientsList />
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }} mt={-8}>
        <AddClientForm endpoint="clients" />
      </GridItem>
    </SimpleGrid>
  );
};
export default ClientsPage;
