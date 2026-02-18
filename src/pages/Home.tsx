import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import NavBar from "../components/Global/NavBar/NavBar";

function Home(): JSX.Element {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <Box height="20" bg="red.500" />
      <Box height="20" bg={"blue.500"} />
      <Box height="20" bg={"green.500"} />
      <Box height="20" bg={"yellow.500"} />
    </SimpleGrid>
  );
}

export default Home;
