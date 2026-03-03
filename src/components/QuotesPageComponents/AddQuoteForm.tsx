import {
  Box,
  Field,
  Fieldset,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SelectClient from "../General/SelectClient";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import SelectQuoteStatus from "./SelectQuoteStatus";
import LineItemsInput, { LineItem } from "./LineItemsInput";
import SearchTemplatesInput from "./SearchTemplatesInput";
import GenericDateInput from "./GenericDateInput";
import { searchTemplates } from "../../services/templateService";
import TextAreaInput from "../General/TextAreaInput";
import useCompany from "../../hooks/useCompany";
import SelectVAT from "../InvoicePageComponents/SelectVAT";
import AddNewDataButton from "../General/AddNewDataButton";
import SelectPaymentOptions from "../General/SelectPaymentOption";
import useBanks from "../../hooks/useBanks";

const today = new Date().toISOString().slice(0, 10);

const expiry_date: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

interface QuoteFormDataProps {
  client_id: string;
  description: string;
  issue_date: string;
  expiry_date: string;
  line_items: LineItem[];
  notes: string;
  quote_terms: string;
  payment_details: number | string;
  vat_rate: string;
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
  issue_date: today,
  expiry_date: expiry_date,
  line_items: [],
  notes: "",
  quote_terms: "",
  payment_details: "",
  vat_rate: "",
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

  const { data: companyData } = useCompany();
  const { data: bankData } = useBanks();

  useEffect(() => {
    if (companyData[0]) {
      setFormData((prev) => ({
        ...prev,
        vat_rate: companyData[0]?.is_vat_registered ? "20.00" : "0.00",
        quote_terms: companyData[0]?.quote_terms ?? "",
      }));
    }
  }, [companyData]);

  useEffect(() => {
    const defaultPaymentArray = bankData.filter(
      (bank) => bank.is_default === true,
    );
    const defaultPayment = defaultPaymentArray[0];
    if (defaultPayment) {
      setFormData((prev) => ({
        ...prev,
        payment_details: defaultPayment.id,
      }));
    }
  }, [companyData]);

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
                  bg="gray.50"
                  _hover={{ bg: "gray.100" }}
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

              <TextAreaInput
                label="Notes"
                nameProp="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter optional notes"
              />

              <TextAreaInput
                label="Quoting terms"
                nameProp="quote_terms"
                value={formData.quote_terms}
                onChange={handleChange}
                placeholder="You can add default quoting terms in company details section in top right corner."
              />
              <SelectPaymentOptions
                label="Payment Details"
                formData={formData}
                onChange={handleChange}
              />

              {/* Status */}
              <HStack gap={2}>
                <SelectVAT
                  vat_rate={formData.vat_rate}
                  onChange={handleChange}
                />
                <SelectQuoteStatus
                  status={formData.status}
                  onChange={handleChange}
                />
              </HStack>
            </Fieldset.Content>

            {/* Error */}
            {error && (
              <Text color="red.500" mt={4}>
                {error}
              </Text>
            )}

            {/* Actions */}

            <Box mt={3}>
              <AddNewDataButton loading={loading} label="Quote" />
            </Box>
          </Fieldset.Root>
        </Box>
      </Box>
    </form>
  );
};

export default AddQuoteForm;
