import { Badge, Box, Button, HStack, Table, Text } from "@chakra-ui/react";
import useBanks from "../hooks/useBanks";
import DeleteButton from "../components/General/DeleteButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePatchBankDetail from "../hooks/usePatchBankDetail";

const BankPage = () => {
  const navigate = useNavigate();
  const { data: banks = [] } = useBanks();
  const { update } = usePatchBankDetail();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleSetDefault = async (id: number) => {
    try {
      setLoadingId(id);
      await update(id, { is_default: true });
      window.location.reload();
    } catch (error) {
      console.error("Failed to set default bank:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Box>
      <HStack mb={2} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Bank Details
        </Text>
        <Button variant="ghost" onClick={() => navigate("/company")} size="md">
          ← Back
        </Button>
      </HStack>

      <Box width="100%" boxShadow="md" borderRadius="md" overflowX="auto">
        <Table.Root variant="outline">
          <Table.Header bg="white">
            <Table.Row>
              <Table.ColumnHeader fontWeight="semibold">
                Bank Name
              </Table.ColumnHeader>
              <Table.ColumnHeader>Account Number</Table.ColumnHeader>
              <Table.ColumnHeader>Sort Code</Table.ColumnHeader>
              <Table.ColumnHeader>Payment Instructions</Table.ColumnHeader>
              <Table.ColumnHeader>Default</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {banks.map((bank) => (
              <Table.Row key={bank.id}>
                <Table.Cell fontWeight="bold">{bank.bank_name}</Table.Cell>
                <Table.Cell>{bank.account_number}</Table.Cell>
                <Table.Cell>{bank.sort_code || "-"}</Table.Cell>

                {/* Fix: truncation must be on an inner Text, not on Table.Cell */}
                <Table.Cell>
                  <Text truncate maxW="200px">
                    {bank.payment_instructions || "-"}
                  </Text>
                </Table.Cell>

                {/* Fix: Badge needs visible text content */}
                <Table.Cell>
                  <Badge
                    bg={bank.is_default ? "green.300" : "red.300"}
                    minW="50px"
                    textAlign="center"
                  ></Badge>
                </Table.Cell>

                <Table.Cell textAlign="center">
                  <Button
                    size="sm"
                    colorPalette="blue" // Fix: colorScheme → colorPalette (Chakra v3)
                    mr={2}
                    loading={loadingId === bank.id} // Fix: isLoading → loading (Chakra v3)
                    onClick={() => handleSetDefault(bank.id)}
                    disabled={bank.is_default || loadingId === bank.id}
                  >
                    Set Default
                  </Button>
                  <DeleteButton
                    endpoint="company/bank"
                    id={bank.id}
                    buttonLabel="Delete"
                    onSuccess={() => window.location.reload()}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default BankPage;
