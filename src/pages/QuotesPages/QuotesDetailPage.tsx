import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import LineItemsInput from "../../components/QuotesPageComponents/LineItemsInput";
import SearchTemplatesInput from "../../components/QuotesPageComponents/SearchTemplatesInput";
import { searchTemplates } from "../../services/templateService";
import { Template } from "../../components/QuotesPageComponents/AddQuoteForm";
import { formatDateForAPI, formatDateForInput } from "../../utilities/date";
import SelectQuoteStatus from "../../components/QuotesPageComponents/SelectQuoteStatus";
import { useDownload } from "../../hooks/Generic/useDownload";
import EditTextArea from "../../components/General/EditTextArea";
import SelectVAT from "../../components/InvoicePageComponents/SelectVAT";
import { brand } from "../../constants";
import SelectPaymentOptions from "../../components/General/SelectPaymentOption";

const QuotesDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { downloadFile } = useDownload();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [quote, setQuote] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await api.get(`/quotes/${id}/`);
        setQuote(res.data);
        setFormData(res.data);
      } catch {
        setError("Failed to load client");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        client_id: formData.client.id,
        description: formData.description,
        notes: formData.notes,
        quote_terms: formData.quote_terms,
        issue_date: formatDateForAPI(formData.issue_date),
        expiry_date: formatDateForAPI(formData.expiry_date),
        line_items: formData.line_items,
        vat_rate: parseFloat(formData.vat_rate).toFixed(2),
        payment_details: formData.payment_details,
        status: formData.status,
      };
      const res = await api.put(`/quotes/${id}/`, dataToSave);
      setQuote(res.data);
      setIsEditing(false);
    } catch {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (searchTextOrResult: string | any) => {
    if (typeof searchTextOrResult === "object") {
      setSelectedTemplate(searchTextOrResult);
      return;
    }
    const data = await searchTemplates(searchTextOrResult);
    setSearchResults(data);
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  const handleDownload = async () => {
    try {
      await downloadFile(
        `/quotes/${quote.id}/download/`,
        `Quote-${quote.number}.pdf`,
      );
    } catch {
      alert("Failed to download quote");
    }
  };

  return (
    <Box maxW="800px" mx="auto" py={4}>
      {/* Header Section */}
      <VStack align="stretch" mb={4}>
        <HStack justify="space-between" align="start">
          <VStack mt="auto" gap={1}>
            <Heading size="xl">{quote.client.name}</Heading>
            <Text color="gray.500" fontSize="sm">
              Quote Details
            </Text>
          </VStack>

          {!isEditing ? (
            <VStack>
              <Button variant="ghost" onClick={() => navigate(-1)} size="md">
                ← Back to Quotes
              </Button>
              <HStack>
                <Button colorPalette={brand} onClick={handleDownload}>
                  Download PDF
                </Button>
                <Button
                  colorPalette={"red"}
                  bg={"red.500"}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </HStack>
            </VStack>
          ) : (
            <HStack gap={2}>
              <Button
                colorPalette="green"
                onClick={handleSave}
                loading={saving}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(quote);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </HStack>
          )}
        </HStack>
      </VStack>

      {/* Content Section */}
      <Card.Root mb={8} bg="white" boxShadow="sm">
        <Card.Body>
          <VStack gap={6} align="stretch">
            {/* Description */}
            <EditTextArea
              nameProp="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              isEditing={isEditing}
              data={quote.description}
              label="Description"
            />

            {/* Expiry Date */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Expiry Date
              </Text>
              {isEditing ? (
                <Input
                  name="expiry_date"
                  type="date"
                  value={formatDateForInput(formData.expiry_date)}
                  onChange={handleChange}
                  placeholder="Enter date"
                  size="md"
                />
              ) : (
                <Text fontSize="md">{quote.expiry_date}</Text>
              )}
            </VStack>

            {/* Line Items */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Line Items
              </Text>
              {isEditing ? (
                <Box>
                  <SearchTemplatesInput
                    onSearch={handleSearch}
                    onSelect={(result) => setSelectedTemplate(result)}
                    results={searchResults}
                  />
                  <LineItemsInput
                    lineItems={formData.line_items}
                    onChange={(items) =>
                      setFormData({ ...formData, line_items: items })
                    }
                    clientId={formData.client.id}
                    selectedTemplate={selectedTemplate}
                  />
                </Box>
              ) : (
                <VStack gap={2} align="stretch">
                  {quote.line_items.map((item: any) => (
                    <Box key={item.id} p={3} bg="gray.50" borderRadius="md">
                      <Text fontWeight="medium">{item.name}</Text>
                      <Text fontSize="sm">
                        Quantity: {item.quantity} Unit Price: £{item.unit_price}{" "}
                        Total: £{item.unit_price * item.quantity}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              )}
            </VStack>

            {/* Payment details */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Payment Details
              </Text>
              {isEditing ? (
                <SelectPaymentOptions
                  formData={formData}
                  onChange={handleChange}
                />
              ) : (
                <Box fontSize="md">
                  <Text>Bank Name: {quote.bank_name}</Text>
                  <Text>Account Number: {quote.account_number}</Text>
                </Box>
              )}
            </VStack>

            {/* VAT rate */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                VAT Rate
              </Text>
              {isEditing ? (
                <SelectVAT
                  vat_rate={formData.vat_rate}
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="md">{quote.vat_rate_display}</Text>
              )}
            </VStack>

            <EditTextArea
              nameProp="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              isEditing={isEditing}
              data={quote.notes}
              label="Notes"
            />

            <EditTextArea
              nameProp="quote_terms"
              value={formData.quote_terms}
              onChange={handleChange}
              placeholder="Enter quote terms"
              isEditing={isEditing}
              data={quote.quote_terms}
              label="Quote terms"
            />

            {/* Status */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Status
              </Text>
              {isEditing ? (
                <SelectQuoteStatus
                  status={formData.status}
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="md">{quote.status_display}</Text>
              )}
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default QuotesDetailPage;
