import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { brand } from "../../constants";

interface Props {
  children: ReactNode;
}

const TitleSeeAll = ({ children }: Props) => {
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
          {children}
        </Text>
        <Button
          size="sm"
          colorPalette="blue"
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

export default TitleSeeAll;
