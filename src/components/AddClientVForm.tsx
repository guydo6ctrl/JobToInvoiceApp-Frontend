import {
  Button,
  Field,
  Input,
  Textarea,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormSubmit } from "../hooks/useFormSubmit";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const AddClientVForm = ({ endpoint }: { endpoint: string }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData({ name: "", email: "", phone: "", address: "" });
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
    <Box maxW="500px" mx="auto" py={8}>
      <Heading size="lg" mb={6}>
        Add New Client
      </Heading>
      <form onSubmit={handleSubmit}>
        <Field.Root>
          <Text>Name *</Text>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Field.Root>

        <Field.Root>
          <Text>Email *</Text>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Field.Root>

        <Field.Root>
          <Text>Phone</Text>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Text>Address</Text>
          <Textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Field.Root>

        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}

        <Button type="submit" colorScheme="blue" mt={6} loading={loading}>
          Add Client
        </Button>
      </form>
    </Box>
  );
};

export default AddClientVForm;
