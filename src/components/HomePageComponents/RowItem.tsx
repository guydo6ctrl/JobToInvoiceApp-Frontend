import { Badge, HStack, VStack, Text } from "@chakra-ui/react";
import { homeStatusColor } from "../../utilities/homeStatusColor";
import { fmt } from "../../utilities/homeCurrencyFormat";

interface Props {
  number: string;
  client: string;
  amount: number;
  status: string;
  statusDisplay: string;
  date: string;
  dateLabel: string;
  onClick: () => void;
}

const RowItem = ({
  number,
  client,
  amount,
  status,
  statusDisplay,
  date,
  dateLabel,
  onClick,
}: Props) => {
  return (
    <HStack
      justify="space-between"
      py={3}
      px={1}
      borderBottom="1px solid"
      borderColor="gray.50"
      cursor="pointer"
      _hover={{ bg: "gray.50", mx: -1, px: 2, borderRadius: "md" }}
      transition="all 0.1s"
      onClick={onClick}
    >
      <HStack gap={3}>
        <VStack align="start" gap={0}>
          <Text fontSize="12px" fontWeight="700" color="gray.800">
            {number}
          </Text>
          <Text fontSize="11px" color="gray.400">
            {client}
          </Text>
        </VStack>
      </HStack>
      <HStack gap={4}>
        <VStack align="end" gap={0}>
          <Text fontSize="11px" color="gray.400">
            {dateLabel}
          </Text>
          <Text fontSize="11px" fontWeight="500" color="gray.600">
            {date}
          </Text>
        </VStack>
        <Badge
          colorPalette={homeStatusColor(status)}
          size="sm"
          borderRadius="full"
          px={2}
        >
          {statusDisplay}
        </Badge>
        <Text
          fontSize="13px"
          fontWeight="700"
          color="gray.800"
          minW="70px"
          textAlign="right"
        >
          {fmt(amount)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default RowItem;
