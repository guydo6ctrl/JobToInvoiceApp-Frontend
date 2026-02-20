import React from "react";
import QuotesList from "../components/QuotesPageComponents/QuotesList";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import AddQuoteForm from "../components/QuotesPageComponents/AddQuoteForm";

const QuotesPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} gap="40px">
      <GridItem colSpan={{ base: 1, lg: 1 }}>
        <QuotesList />
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <AddQuoteForm endpoint="quotes" />
      </GridItem>
    </SimpleGrid>
  );
};

export default QuotesPage;
