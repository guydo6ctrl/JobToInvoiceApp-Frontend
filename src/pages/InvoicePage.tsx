import { GridItem, SimpleGrid } from "@chakra-ui/react";
import AddInvoiceByQuote from "../components/InvoicePageComponents/AddInvoiceByQuote";
import InvoiceList from "../components/InvoicePageComponents/InvoiceList";
import AddInvoiceForm from "../components/InvoicePageComponents/AddInvoiceForm";

const InvoicePage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <GridItem colSpan={{ base: 1, lg: 1 }}>
        <InvoiceList />
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <AddInvoiceForm endpoint="invoices" />
      </GridItem>
    </SimpleGrid>
  );
};

export default InvoicePage;
