import {
  Button,
  Field,
  Fieldset,
  Input,
  Textarea,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import type { JSX } from "react";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const AddClientForm = (): JSX.Element => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add client");
      }

      setFormData({ name: "", email: "", phone: "", address: "" });
      alert("Client added successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="500px" mx="auto" py={8}>
      <Heading size="lg" mb={6}>
        Add New Client
      </Heading>

      <Fieldset.Root size="lg">
        <Fieldset.Content>
          <Field.Root>
            <Text>Name *</Text>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Client name"
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
              placeholder="client@example.com"
              required
            />
          </Field.Root>

          <Field.Root>
            <Text>Phone</Text>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />
          </Field.Root>

          <Field.Root>
            <Text>Address</Text>
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, city, state..."
            />
          </Field.Root>
        </Fieldset.Content>

        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="blue"
          mt={6}
          onClick={handleSubmit}
          loading={loading}
        >
          Add Client
        </Button>
      </Fieldset.Root>
    </Box>
  );
};

export default AddClientForm;
