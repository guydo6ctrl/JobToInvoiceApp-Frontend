import {
  Box,
  Button,
  Field,
  Fieldset,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SelectClient from "./SelectClient";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import SelectQuoteStatus from "./SelectQuoteStatus";
import LineItemsInput from "./LineItemsInput";
import { LineItem } from "./LineItemsInput";
import SearchTemplatesInput from "./SearchTemplatesInput";

interface QuoteFormData {
  client: string;
  issue_date: string;
  expiry_date: string;
  line_items: LineItem[];
  status: string;
}

const AddQuoteForm = ({ endpoint }: { endpoint: string }): JSX.Element => {
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearch = async (searchText: string) => {
    const response = await fetch(
      `http://localhost:8000/templates/?search=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      },
    );
    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <Box mx="auto" py={8} width="100%">
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
            <Box flex="3" width="100%">
              <SearchTemplatesInput
                onSearch={handleSearch}
                results={searchResults}
              />
            </Box>
            <Box flex="1" width="100%">
              <LineItemsInput
                lineItems={formData.line_items}
                onChange={(items) =>
                  setFormData({ ...formData, line_items: items })
                }
                clientId={formData.client} 
              />
            </Box>
          </Field.Root>

          <SelectQuoteStatus status={formData.status} onChange={handleChange} />
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
