import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  alert?: boolean;
}
const StatCard = ({
  label,
  value,
  sub,
  accent = false,
  alert = false,
}: Props) => {
  return (
    <Box
      bg={accent ? "blue.600" : alert ? "red.50" : "white"}
      border="1px solid"
      borderColor={alert ? "red.200" : accent ? "blue.600" : "gray.100"}
      borderRadius="lg"
      p={5}
      position="relative"
      overflow="hidden"
      _hover={{ boxShadow: "sm", transform: "translateY(-1px)" }}
      transition="all 0.15s"
    >
      {accent && (
        <Box
          position="absolute"
          top={0}
          right={0}
          w="80px"
          h="80px"
          bg="whiteAlpha.100"
          borderRadius="full"
          transform="translate(20px, -20px)"
        />
      )}
      <Text
        fontSize="10px"
        fontWeight="700"
        letterSpacing="1.5px"
        textTransform="uppercase"
        color={accent ? "whiteAlpha.700" : alert ? "red.400" : "gray.400"}
        mb={2}
      >
        {label}
      </Text>
      <Text
        fontSize="26px"
        fontWeight="800"
        color={accent ? "white" : alert ? "red.600" : "gray.800"}
        lineHeight="1"
        mb={1}
        fontFamily="'Barlow Condensed', sans-serif"
      >
        {value}
      </Text>
      {sub && (
        <Text
          fontSize="11px"
          color={accent ? "whiteAlpha.600" : alert ? "red.400" : "gray.400"}
          mt={1}
        >
          {sub}
        </Text>
      )}
    </Box>
  );
};

export default StatCard;
