import {
  Button,
  Field,
  Input,
  Textarea,
  Heading,
  Text,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormSubmit } from "../../hooks/useFormSubmit";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const defaultClientFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddClientForm = ({ endpoint }: { endpoint: string }) => {
  const [formData, setFormData] = useState<ClientFormData>(
    defaultClientFormData,
  );

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData(defaultClientFormData);
      alert("Client added successfully!");
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
    <Box
      mx="auto"
      my={8}
      maxW="900px"
      width="100%"
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="md"
    >
      <form onSubmit={handleSubmit}>
        <VStack gap={6} align="stretch">
          <Heading size="lg" mb={4} textAlign="center">
            Add New Client
          </Heading>

          {/* Name */}
          <Field.Root>
            <Text fontWeight="medium">Name</Text>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              borderRadius="md"
            />
          </Field.Root>

          {/* Email */}
          <Field.Root>
            <Text fontWeight="medium">Email</Text>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              borderRadius="md"
            />
          </Field.Root>

          {/* Phone */}
          <Field.Root>
            <Text fontWeight="medium">Phone</Text>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              borderRadius="md"
            />
          </Field.Root>

          {/* Address */}
          <Field.Root>
            <Text fontWeight="medium">Address</Text>
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              borderRadius="md"
            />
          </Field.Root>

          {/* Error message */}
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            colorScheme="blue"
            mt={2}
            loading={loading}
            size="md"
          >
            Add Client
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddClientForm;
