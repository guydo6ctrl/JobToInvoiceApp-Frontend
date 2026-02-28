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
import { brand } from "../../constants";

interface CompanyFormData {
  name: string;
  email: string;
  phone: string;
  is_vat_registered: boolean;
  address_line: string;
  town_or_city: string;
  postcode: string;
  country: string;
}

const defaultCompanyFormData = {
  name: "",
  email: "",
  phone: "",
  is_vat_registered: true,
  address_line: "",
  town_or_city: "",
  postcode: "",
  country: "United Kingdom",
};

const AddCompanyDetailsForm = ({ endpoint }: { endpoint: string }) => {
  const [formData, setFormData] = useState<CompanyFormData>(
    defaultCompanyFormData,
  );

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData(defaultCompanyFormData);
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
    window.location.reload();
  };

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <Card.Root>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <VStack gap={2} align="stretch">
              {/* Header */}
              <VStack gap={2} align="stretch">
                <Heading size="lg">Company Details</Heading>
                <Text color="gray.600" fontSize="sm">
                  Enter your business information
                </Text>
              </VStack>

              <div />

              {/* Business Information Section */}
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Business Information
                </Text>

                <GenericTextInput
                  children="Company Name"
                  value={formData.name}
                  handleChange={handleChange}
                  name="name"
                />

                <GenericTextInput
                  children="Email Address"
                  value={formData.email}
                  handleChange={handleChange}
                  type="email"
                  name="email"
                />

                <GenericTextInput
                  children="Phone Number"
                  value={formData.phone}
                  handleChange={handleChange}
                  name="phone"
                />
              </VStack>

              <HStack gap={3}>
                <input
                  type="checkbox"
                  checked={formData.is_vat_registered}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_vat_registered: e.target.checked,
                    })
                  }
                />
                <Text ml={2}>Is your business VAT registered?</Text>
              </HStack>

              {/* Address Section */}
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Address
                </Text>

                <GenericTextInput
                  children="Street Address"
                  value={formData.address_line}
                  handleChange={handleChange}
                  name="address_line"
                />

                <HStack gap={4} align="stretch">
                  <Box flex={2}>
                    <GenericTextInput
                      children="Town/City"
                      value={formData.town_or_city}
                      handleChange={handleChange}
                      name="town_or_city"
                    />
                  </Box>
                  <Box flex={1}>
                    <GenericTextInput
                      children="Postcode"
                      value={formData.postcode}
                      handleChange={handleChange}
                      name="postcode"
                    />
                  </Box>
                </HStack>

                <GenericTextInput
                  children="Country"
                  value={formData.country}
                  handleChange={handleChange}
                  name="country"
                />
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
            </VStack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default AddCompanyDetailsForm;
