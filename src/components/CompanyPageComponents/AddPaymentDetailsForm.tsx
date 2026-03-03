import {
  Button,
  Input,
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import GenericTextInput from "../General/GenericTextInput";
import { useNavigate } from "react-router-dom";
import { brand } from "../../constants";

interface BankFormData {
  bank_name: string;
  account_number: string;
  sort_code: string;
  is_default: boolean;
}

const defaultBankFormData = {
  bank_name: "",
  account_number: "",
  sort_code: "",
  is_default: false,
};

const AddPaymentDetailsForm = ({ endpoint }: { endpoint: string }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BankFormData>(defaultBankFormData);

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData(defaultBankFormData);
      alert("Details added successfully!");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <Card.Root>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <VStack gap={2} align="stretch">
              {/* Header */}
              <VStack gap={2} align="stretch">
                <HStack justifyContent="space-between">
                  <Heading size="lg">Bank Details</Heading>
                  <Button
                    size="sm"
                    colorPalette={brand}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("bank/all");
                    }}
                  >
                    See all
                  </Button>
                </HStack>
                <Text color="gray.600" fontSize="sm">
                  Enter your payment information
                </Text>
              </VStack>

              <div />

              {/* Payment Information Section */}
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Payment Information
                </Text>

                <GenericTextInput
                  children="Bank Name"
                  value={formData.bank_name}
                  handleChange={handleChange}
                  name="bank_name"
                />

                <GenericTextInput
                  children="Account Number"
                  value={formData.account_number}
                  handleChange={handleChange}
                  name="account_number"
                />

                <GenericTextInput
                  children="Sort Code"
                  value={formData.sort_code}
                  handleChange={handleChange}
                  name="sort_code"
                />

                <HStack gap={3}>
                  <input
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={(e) =>
                      setFormData({ ...formData, is_default: e.target.checked })
                    }
                  />
                  <Text ml={2}>Set as default payment method</Text>
                </HStack>
              </VStack>
            </VStack>

            {/* Error message */}
            {error && (
              <Box
                bg="red.50"
                p={3}
                borderRadius="md"
                borderLeft="4px"
                borderColor="red.500"
              >
                <Text color="red.700" fontSize="sm">
                  {error}
                </Text>
              </Box>
            )}

            {/* Submit button */}
            <HStack gap={3} justify="flex-end" pt={4}>
              <Button variant="ghost">Cancel</Button>
              <Button
                type="submit"
                colorPalette={brand}
                loading={loading}
                size="md"
              >
                Save Details
              </Button>
            </HStack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default AddPaymentDetailsForm;
