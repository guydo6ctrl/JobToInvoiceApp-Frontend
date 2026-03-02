import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { AlertInterface } from "../Interfaces/homeInterfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  alerts: AlertInterface[];
}
const HomeAlerts = ({ alerts }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {alerts.length > 0 && (
        <Box
          bg="red.50"
          border="1px solid"
          borderColor="red.100"
          borderRadius="lg"
          px={4}
          py={3}
        >
          <Text
            fontSize="10px"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color="red.400"
            mb={2}
          >
            Needs Attention
          </Text>
          <VStack align="stretch" gap={1}>
            {alerts.map((a, i) => (
              <HStack
                key={i}
                justify="space-between"
                cursor="pointer"
                onClick={() => navigate(a.link)}
                _hover={{ opacity: 0.8 }}
              >
                <Text fontSize="12px" color="red.700">
                  {a.message}
                </Text>
                <Text fontSize="11px" color="red.400">
                  View →
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
};

export default HomeAlerts;
