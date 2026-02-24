import { Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const InvoiceTitleSeeAll = () => {
  const navigate = useNavigate();

  return (
    <HStack justifyContent="space-between" mb={3}>
      <Text fontSize="2xl" fontWeight="bold" flex={1}>
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
  );
};

export default InvoiceTitleSeeAll;
