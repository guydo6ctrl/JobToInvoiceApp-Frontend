import {
  Box,
  Button,
  Field,
  Fieldset,
  Heading,
  HStack,
  Input,
  Text,
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

interface InvoiceFormDataProps {
  client: string;
  source_quote: string;
  description: string;
  issue_date: string;
  due_date: string;
  line_items: LineItem[];
  status: string;
}

const defaultFormData = {
  client: "",
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
      <Box mx="auto" py={8} width="100%">
        <Heading size="lg" mb={6}>
          Add New Invoice
        </Heading>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <SelectClient formData={formData} handleChange={handleChange} />
            <SelectQuote
              formData={formData}
              handleChange={handleChange}
              client={formData.client}
              onSelectQuote={handleSelectQuote}
            />
            <Field.Root>
              <Text>Description</Text>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Field.Root>
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
            <Field.Root>
              <Box flex="3" width="100%">
                <SearchTemplatesInput
                  onSearch={handleSearch}
                  onSelect={(result) => setSelectedTemplate(result)}
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
                  selectedTemplate={selectedTemplate}
                />
              </Box>
            </Field.Root>
            <SelectInvoiceStatus
              status={formData.status}
              onChange={handleChange}
            />
          </Fieldset.Content>
          {error && (
            <Text color="red.500" mt={4}>
              {error}
            </Text>
          )}
          <Button type="submit" colorScheme="blue" mt={6} loading={loading}>
            Add Invoice
          </Button>
        </Fieldset.Root>
      </Box>
    </form>
  );
};

export default AddInvoiceForm;
