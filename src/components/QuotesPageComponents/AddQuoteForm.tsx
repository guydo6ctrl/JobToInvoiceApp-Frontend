import {
  Box,
  Button,
  Field,
  Fieldset,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SelectClient from "../General/SelectClient";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import SelectQuoteStatus from "./SelectQuoteStatus";
import LineItemsInput, { LineItem } from "./LineItemsInput";
import SearchTemplatesInput from "./SearchTemplatesInput";
import GenericDateInput from "./GenericDateInput";
import { searchTemplates } from "../../services/templateService";

interface QuoteFormDataProps {
  client_id: string;
  description: string;
  issue_date: string;
  expiry_date: string;
  line_items: LineItem[];
  status: string;
}

export interface Template {
  name: string;
  description: string;
  unit_price: number;
  type: string;
}

const defaultFormData = {
  client_id: "",
  description: "",
  issue_date: "",
  expiry_date: "",
  line_items: [],
  status: "",
};

const AddQuoteForm = ({ endpoint }: { endpoint: string }): JSX.Element => {
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState<QuoteFormDataProps>(defaultFormData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData(defaultFormData);
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

  const handleSearch = async (searchTextOrResult: string | any) => {
    if (typeof searchTextOrResult === "object") {
      setSelectedTemplate(searchTextOrResult);
      return;
    }
    const data = await searchTemplates(searchTextOrResult);
    setSearchResults(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mx="auto" py={8} maxW="900px" width="100%">
        {/* Card */}
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <Heading size="lg" mb={6} textAlign="center">
            Add New Quote
          </Heading>

          <Fieldset.Root size="lg">
            <Fieldset.Content gap={5}>
              {/* Client */}
              <SelectClient formData={formData} handleChange={handleChange} />

              {/* Description */}
              <Field.Root>
                <Text fontWeight="medium">Description</Text>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Field.Root>

              {/* Dates */}
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <GenericDateInput
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                >
                  Issue Date
                </GenericDateInput>

                <GenericDateInput
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                >
                  Expiry Date
                </GenericDateInput>
              </SimpleGrid>

              {/* Templates + Line Items */}

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Line Item Templates
                </Text>
                <SearchTemplatesInput
                  onSearch={handleSearch}
                  onSelect={(result) => setSelectedTemplate(result)}
                  results={searchResults}
                />
              </Box>

              <Box>
                <LineItemsInput
                  lineItems={formData.line_items}
                  onChange={(items) =>
                    setFormData({ ...formData, line_items: items })
                  }
                  clientId={formData.client_id}
                  selectedTemplate={selectedTemplate}
                />
              </Box>

              {/* Status */}
              <SelectQuoteStatus
                status={formData.status}
                onChange={handleChange}
              />
            </Fieldset.Content>

            {/* Error */}
            {error && (
              <Text color="red.500" mt={4}>
                {error}
              </Text>
            )}

            {/* Actions */}
            <HStack justify="flex-end" mt={6}>
              <Button type="submit" colorScheme="blue" loading={loading}>
                Add Quote
              </Button>
            </HStack>
          </Fieldset.Root>
        </Box>
      </Box>
    </form>
  );
};

export default AddQuoteForm;
