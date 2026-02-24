import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const InvoiceTitleSeeAll = () => {
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      p={4}
      mb={3}
      borderRadius="md"
      shadow="sm"
      _hover={{ shadow: "md", bg: "gray.50" }}
      cursor="default"
    >
      <HStack justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Invoice List
        </Text>
        <Button
          size="sm"
          colorScheme="gray"
          onClick={(e) => {
            e.stopPropagation();
            navigate("all");
          }}
        >
          See All
        </Button>
      </HStack>
    </Box>
  );
};

export default InvoiceTitleSeeAll;
