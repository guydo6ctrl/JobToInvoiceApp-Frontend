import { Flex, Switch, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  showArchived: boolean;
  onCheckedChange: (e: { checked: boolean }) => void;
}

const DataTableHeader = ({
  children,
  showArchived,
  onCheckedChange,
}: Props) => {
  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Text fontSize="xl" fontWeight="bold">
        {children}
      </Text>

      <Flex align="center" gap={2}>
        <Text fontSize="sm" color="gray.600">
          {showArchived ? "Showing Archived" : "Showing Active"}
        </Text>
        <Switch.Root checked={showArchived} onCheckedChange={onCheckedChange}>
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Flex>
    </Flex>
  );
};

export default DataTableHeader;
