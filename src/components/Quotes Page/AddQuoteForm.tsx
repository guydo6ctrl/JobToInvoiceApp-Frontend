import {
  Box,
  Button,
  Field,
  Fieldset,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SelectClient from "./SelectClient";
import { useFormSubmit } from "../../hooks/useFormSubmit";

interface QuoteFormData {
  client: string;
  issue_date: string;
  expiry_date: string;
  line_items: [];
  status: string;
}

const AddQuoteForm = ({ endpoint }: { endpoint: string }): JSX.Element => {
  const [formData, setFormData] = useState<QuoteFormData>({
    client: "",
    issue_date: "",
    expiry_date: "",
    line_items: [],
    status: "",
  });

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData({
        client: "",
        issue_date: "",
        expiry_date: "",
        line_items: [],
        status: "",
      });
      alert("Quote added successfully!");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  return (
    <Box maxW="500px" mx="auto" py={8}>
      <Heading size="lg" mb={6}>
        Add New Quote
      </Heading>

      <Fieldset.Root size="lg">
        <Fieldset.Content>
          <SelectClient formData={formData} handleChange={handleChange} />

          <Field.Root>
            <Text>Issue Date *</Text>
            <Input
              name="issue_date"
              type="date"
              value={formData.issue_date}
              onChange={handleChange}
              placeholder="01-01-2000"
            />
          </Field.Root>

          <Field.Root>
            <Text>Expiry Date</Text>
            <Input
              name="expiry_date"
              type="date"
              value={formData.expiry_date}
              onChange={handleChange}
              placeholder="01-01-2000"
            />
          </Field.Root>

          <Field.Root>
            <Text>Line Items</Text>
            <Input
              name="line_items"
              value={formData.line_items}
              onChange={handleChange}
              placeholder=""
            />
          </Field.Root>

          <Field.Root>
            <Text>Status</Text>
            <Textarea
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Draft"
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
          Add Quote
        </Button>
      </Fieldset.Root>
    </Box>
  );
};

export default AddQuoteForm;
