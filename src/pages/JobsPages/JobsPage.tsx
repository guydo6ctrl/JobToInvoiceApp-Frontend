import { GridItem, SimpleGrid } from "@chakra-ui/react";
import JobsList from "../../components/JobsPageComponents/JobsList";
import AddJobForm from "../../components/JobsPageComponents/AddJobForm";
import TitleSeeAll from "../../components/General/TitleSeeAll";

const JobsPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <GridItem>
        <TitleSeeAll children="Jobs List" />
        <JobsList />
      </GridItem>
      <GridItem marginTop={-8}>
        <AddJobForm endpoint="jobs" />
      </GridItem>
    </SimpleGrid>
  );
};

export default JobsPage;
