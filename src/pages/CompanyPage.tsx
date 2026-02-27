import {
  Box,
  Heading,
  SimpleGrid,
  GridItem,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import AddCompanyDetailsForm from "../components/CompanyPageComponents/AddCompanyDetailsForm";
import useCompany from "../hooks/useCompany";
import AddPaymentDetailsForm from "../components/CompanyPageComponents/AddPaymentDetailsForm";

const CompanyPage = () => {
  const { data, isLoading, error } = useCompany();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error loading company details</Text>;

  return (
    <VStack align="stretch" gap={8} w="100%">
      {/* Page Header */}
      <Box marginLeft={4}>
        <Heading size="lg">Details</Heading>
        <Text color="gray.600" mt={2}>
          Manage your company and payment information
        </Text>
      </Box>

      {/* Forms Grid */}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap="40px"
        w="100%"
        alignItems="start"
      >
        <GridItem colSpan={{ base: 1, lg: 1 }} w="100%">
          <AddCompanyDetailsForm endpoint="company/details" />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 1 }} w="100%">
          <AddPaymentDetailsForm endpoint="company/bank" />
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default CompanyPage;
