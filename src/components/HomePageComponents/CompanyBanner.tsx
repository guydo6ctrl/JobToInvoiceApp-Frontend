import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CompanyBanner = () => {
  const navigate = useNavigate();

  return (
    <Box
      bg="yellow.50"
      border="1px solid"
      borderColor="yellow.200"
      borderRadius="md"
      p={4}
      mb={4}
    >
      <VStack align="start" gap={2}>
        <Text fontSize="sm" fontWeight="600" color="yellow.800">
          Complete your company details to get started!
        </Text>
        <Button
          colorPalette="yellow"
          size="sm"
          onClick={() => navigate("/company/")}
        >
          Add Company Info
        </Button>
      </VStack>
    </Box>
  );
};

export default CompanyBanner;
