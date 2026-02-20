import { GridItem, SimpleGrid } from "@chakra-ui/react";
import AddInvoiceByQuote from "../components/InvoicePageComponents/AddInvoiceByQuote";
import InvoiceList from "../components/InvoicePageComponents/InvoiceList";

const InvoicePage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <GridItem>
        <InvoiceList />
      </GridItem>
      <GridItem>
        <AddInvoiceByQuote />
      </GridItem>
    </SimpleGrid>
  );
};

export default InvoicePage;
