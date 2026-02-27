import { Box, Table, Text } from "@chakra-ui/react";
import DataTableHeader from "../components/General/DataTableHeader";
import useBanks from "../hooks/useBanks";

const BankPage = () => {
  const { data: banks } = useBanks();
  return (
    <Box>
      <Box mb={2}>
        <DataTableHeader children="Bank Details" />
      </Box>
      <Box width="100%" boxShadow="md" borderRadius="md" overflowX="auto">
        <Table.Root>
          <Table.Header bg="gray.100">
            <Table.Row>
              <Table.ColumnHeader fontWeight="semibold">
                Bank Name
              </Table.ColumnHeader>
              <Table.ColumnHeader>Account Number</Table.ColumnHeader>
              <Table.ColumnHeader>Sort Code</Table.ColumnHeader>
              <Table.ColumnHeader>Payment Instructions</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {banks.map((bank) => (
              <Table.Row
                key={bank.id}
                _hover={{ bg: "gray.50", cursor: "pointer" }}
              >
                <Table.Cell fontWeight="bold">{bank.bank_name}</Table.Cell>
                <Table.Cell>{bank.account_number}</Table.Cell>
                <Table.Cell>{bank.sort_code || "-"}</Table.Cell>
                <Table.Cell>
                  <Text truncate maxW="200px">
                    {bank.payment_instructions || "-"}
                  </Text>
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
