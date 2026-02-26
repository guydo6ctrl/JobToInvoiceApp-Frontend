import { GridItem, SimpleGrid } from "@chakra-ui/react";
import InvoiceList from "../../components/InvoicePageComponents/InvoiceList";
import AddInvoiceForm from "../../components/InvoicePageComponents/AddInvoiceForm";
import TitleSeeAll from "../../components/General/TitleSeeAll";

const InvoicePage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} gap="40px" >
      <GridItem colSpan={{ base: 1, lg: 1 }}>
        <TitleSeeAll children="Invoice List" />
        <InvoiceList limit={5} />
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }} mt={-8}>
        <AddInvoiceForm endpoint="invoices" />
      </GridItem>
    </SimpleGrid>
  );
};

export default InvoicePage;
