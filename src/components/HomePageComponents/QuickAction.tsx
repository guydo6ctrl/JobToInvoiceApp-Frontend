import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  label: string;
  icon: string;
  to: string;
}
const QuickAction = ({ label, icon, to }: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(to)}
      variant="outline"
      borderColor="gray.200"
      borderRadius="lg"
      h="auto"
      py={4}
      px={4}
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="center"
      _hover={{ bg: "blue.50", borderColor: "blue.300", color: "blue.600" }}
      transition="all 0.15s"
      flex={1}
    >
      <Text fontSize="20px">{icon}</Text>
      <Text fontSize="11px" fontWeight="600" letterSpacing="0.3px">
        {label}
      </Text>
    </Button>
  );
};

export default QuickAction;
