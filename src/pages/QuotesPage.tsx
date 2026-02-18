import React from "react";
import QuotesList from "../components/Quotes Page/QuotesList";
import { Box, SimpleGrid } from "@chakra-ui/react";
import AddQuoteForm from "../components/Quotes Page/AddQuoteForm";

const QuotesPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <Box>
        <QuotesList />
      </Box>
      <Box>
        <AddQuoteForm endpoint="quotes" />
      </Box>
    </SimpleGrid>
  );
};

export default QuotesPage;
