import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/Global/NavBar/NavBar";

function Home(): JSX.Element {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav" "main"` }}
      templateColumns={{ base: "1fr", lg: "1fr" }}
      templateRows={{ base: "80px 1fr", lg: "80px 1fr" }}
      height="100vh"
    >
      <GridItem area="nav" bg="0" p={4}>
        <NavBar />
      </GridItem>

      <GridItem area="main" bg="red.500" />
    </Grid>
  );
}

export default Home;
