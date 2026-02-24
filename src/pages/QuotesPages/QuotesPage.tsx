import React from "react";
import QuotesList from "../../components/QuotesPageComponents/QuotesList";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import AddQuoteForm from "../../components/QuotesPageComponents/AddQuoteForm";
import TitleSeeAll from "../../components/General/TitleSeeAll";

const QuotesPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} gap="40px">
      <GridItem colSpan={{ base: 1, lg: 1 }}>
        <TitleSeeAll children="Quotes List" />
        <QuotesList />
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }} mt={-8}>
        <AddQuoteForm endpoint="quotes" />
      </GridItem>
    </SimpleGrid>
  );
};

export default QuotesPage;
