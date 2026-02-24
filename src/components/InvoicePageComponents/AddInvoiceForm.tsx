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
import SelectClient from "../General/SelectClient";
import GenericDateInput from "../QuotesPageComponents/GenericDateInput";
import SearchTemplatesInput from "../QuotesPageComponents/SearchTemplatesInput";
import LineItemsInput, {
  LineItem,
} from "../QuotesPageComponents/LineItemsInput";
import SelectInvoiceStatus from "./SelectInvoiceStatus";
import { useState } from "react";
import { Template } from "../QuotesPageComponents/AddQuoteForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { searchTemplates } from "../../services/templateService";
import SelectQuote from "../General/SelectQuote";
import SelectJob from "../General/SelectJob";

interface InvoiceFormDataProps {
  client_id: string;
  job: string;
  source_quote: string;
  description: string;
  issue_date: string;
  due_date: string;
  line_items: LineItem[];
  status: string;
}

const defaultFormData = {
  client_id: "",
  job: "",
  source_quote: "",
  description: "",
  issue_date: "",
  due_date: "",
  line_items: [],
  status: "",
};

const AddInvoiceForm = ({ endpoint }: { endpoint: string }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] =
    useState<InvoiceFormDataProps>(defaultFormData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData(defaultFormData);
      alert("Invoice added successfully!");
    },
  });

  const handleSearch = async (searchTextOrResult: string | any) => {
    if (typeof searchTextOrResult === "object") {
      setSelectedTemplate(searchTextOrResult);
      return;
    }
    const data = await searchTemplates(searchTextOrResult);
    setSearchResults(data);
  };

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

  const handleSelectQuote = (quote: any) => {
    setFormData({
      ...formData,
      source_quote: formData.source_quote.toString(),
      line_items: quote.line_items.map((item: any) => ({
        name: item.name || item.description,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        type: item.type,
        saveAsTemplate: false,
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        mx="auto"
        my={8}
        p={6}
        maxW="800px"
        bg="white"
        borderRadius="md"
        shadow="md"
      >
        <VStack gap={6} align="stretch">
          {/* Heading */}
          <Heading size="lg" textAlign="center">
            Add New Invoice
          </Heading>

          {/* Client / Job / Quote selectors */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            <SelectClient formData={formData} handleChange={handleChange} />
            <SelectJob
              formData={formData}
              handleChange={handleChange}
              client={formData.client_id}
            />
            <SelectQuote
              formData={formData}
              handleChange={handleChange}
              client={formData.client_id}
              onSelectQuote={handleSelectQuote}
            />
          </SimpleGrid>

          {/* Description */}
          <Box>
            <Text fontWeight="semibold" mb={1}>
              Description
            </Text>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter invoice description"
            />
          </Box>

          {/* Dates */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <GenericDateInput
              name="issue_date"
              value={formData.issue_date}
              children="Issue Date"
              onChange={handleChange}
            />
            <GenericDateInput
              name="due_date"
              value={formData.due_date}
              children="Due Date"
              onChange={handleChange}
            />
          </SimpleGrid>

          {/* Templates and Line Items */}

          <Box>
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

          {/* Status selector */}
          <Box>
            <SelectInvoiceStatus
              status={formData.status}
              onChange={handleChange}
            />
          </Box>

          {/* Error message */}
          {error && (
            <Text color="red.500" fontWeight="medium" textAlign="center">
              {error}
            </Text>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            w="full"
            loading={loading}
          >
            Add Invoice
          </Button>
        </VStack>
      </Box>
    </form>
  );
};

export default AddInvoiceForm;
