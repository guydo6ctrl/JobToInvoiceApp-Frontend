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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import SelectClient from "../General/SelectClient";
import GenericDateInput from "../QuotesPageComponents/GenericDateInput";
import SearchTemplatesInput from "../QuotesPageComponents/SearchTemplatesInput";
import LineItemsInput, {
  LineItem,
} from "../QuotesPageComponents/LineItemsInput";
import SelectInvoiceStatus from "./SelectInvoiceStatus";
import { useEffect, useState } from "react";
import { Template } from "../QuotesPageComponents/AddQuoteForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { searchTemplates } from "../../services/templateService";
import SelectQuote from "../General/SelectQuote";
import SelectJob from "../General/SelectJob";
import { Quote } from "../../hooks/useQuotes";
import { brand } from "../../constants";
import SelectInvoiceVAT from "./SelectVAT";
import useCompany from "../../hooks/useCompany";
import TextAreaInput from "../General/TextAreaInput";
import SelectVAT from "./SelectVAT";
import AddNewDataButton from "../General/AddNewDataButton";

const today = new Date().toISOString().slice(0, 10);

const due_date: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

interface InvoiceFormDataProps {
  client_id: string;
  job: string;
  source_quote: string;
  description: string;
  notes: string;
  payment_instructions: string;
  issue_date: string;
  due_date: string;
  line_items: LineItem[];
  vat_rate: string;
  status: string;
}

const defaultFormData = {
  client_id: "",
  job: "",
  source_quote: "",
  description: "",
  notes: "",
  payment_instructions: "",
  issue_date: today,
  due_date: due_date,
  line_items: [],
  vat_rate: "",
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

  const { data: companyData } = useCompany();

  useEffect(() => {
    if (companyData[0]) {
      setFormData((prev) => ({
        ...prev,
        vat_rate: companyData[0]?.is_vat_registered ? "20.00" : "0.00",
        payment_instructions: companyData[0]?.payment_instructions ?? "",
      }));
    }
  }, [companyData]);

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
      description: quote.description,
      notes: formData.notes,
      issue_date: today,
      due_date: due_date,
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
        maxW="900px"
        width="100%"
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
            <SelectQuote
              formData={formData}
              handleChange={handleChange}
              client={formData.client_id}
              onSelectQuote={handleSelectQuote}
            />
            <SelectJob
              formData={formData}
              handleChange={handleChange}
              client={formData.client_id}
            />
          </SimpleGrid>

          {/* Description */}
          <TextAreaInput
            label="Description"
            nameProp="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter invoice description"
          />

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

          <TextAreaInput
            label="Notes"
            nameProp="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter optional notes"
          />

          <TextAreaInput
            label="Payment Instructions"
            nameProp="payment_instructions"
            value={formData.payment_instructions}
            onChange={handleChange}
            placeholder="You can add default payment instructions in company details section in top right corner."
          />

          {/* Status selector */}
          <Box>
            <HStack gap={3}>
              <SelectVAT vat_rate={formData.vat_rate} onChange={handleChange} />
              <SelectInvoiceStatus
                status={formData.status}
                onChange={handleChange}
              />
            </HStack>
          </Box>

          {/* Error message */}
          {error && (
            <Text color="red.500" fontWeight="medium" textAlign="center">
              {error}
            </Text>
          )}

          {/* Submit Button */}
          <AddNewDataButton loading={loading} label="Invoice" />
        </VStack>
      </Box>
    </form>
  );
};

export default AddInvoiceForm;
