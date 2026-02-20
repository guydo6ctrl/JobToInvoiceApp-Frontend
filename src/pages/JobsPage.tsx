import { GridItem, SimpleGrid } from "@chakra-ui/react";
import JobsList from "../components/Jobs page/JobsList";
import AddJobForm from "../components/Jobs page/AddJobForm";

const JobsPage = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="40px">
      <GridItem>
        <JobsList />
      </GridItem>
      <GridItem>
        <AddJobForm endpoint="jobs" />
      </GridItem>
    </SimpleGrid>
  );
};

export default JobsPage;
