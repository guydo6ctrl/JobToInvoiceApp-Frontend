import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Template } from "../../components/QuotesPageComponents/AddQuoteForm";
import api from "../../services/api";
import { formatDateForAPI, formatDateForInput } from "../../utilities/date";
import { searchTemplates } from "../../services/templateService";
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
import SearchTemplatesInput from "../../components/QuotesPageComponents/SearchTemplatesInput";
import LineItemsInput from "../../components/QuotesPageComponents/LineItemsInput";
import SelectInvoiceStatus from "../../components/InvoicePageComponents/SelectInvoiceStatus";
import { useDownload } from "../../hooks/Generic/useDownload";
import SelectInvoiceVAT from "../../components/InvoicePageComponents/SelectVAT";
import EditField from "../../components/General/EditCompanyField";
import EditTextArea from "../../components/General/EditTextArea";
import SelectQuote from "../../components/General/SelectQuote";

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { downloadFile } = useDownload();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [invoice, setInvoice] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(`/invoices/${id}/`);
        setInvoice(res.data);
        setFormData(res.data);
      } catch {
        setError("Failed to load client");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        client_id: formData.client.id,
        description: formData.description,
        notes: formData.notes,
        payment_instructions: formData.payment_instructions,
        issue_date: formatDateForAPI(formData.issue_date),
        due_date: formatDateForAPI(formData.due_date),
        line_items: formData.line_items,
        vat_rate: parseFloat(formData.vat_rate).toFixed(2),
        status: formData.status,
      };
      const res = await api.put(`/invoices/${id}/`, dataToSave);
      setInvoice(res.data);
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
        `/invoices/${invoice.id}/download/`,
        `Invoice-${invoice.number}.pdf`,
      );
    } catch {
      alert("Failed to download invoice");
    }
  };

  return (
    <Box maxW="800px" mx="auto" py={8}>
      {/* Header Section */}
      <VStack align="stretch" mb={8}>
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1}>
            <Heading size="xl">{invoice.client.name}</Heading>
            <Text color="gray.500" fontSize="sm">
              Invoice Details
            </Text>
          </VStack>

          {!isEditing ? (
            <HStack>
              <Button onClick={handleDownload}>Download PDF</Button>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </HStack>
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
                  setFormData(invoice);
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
              data={invoice.description}
              label="Description"
            />

            {/* Source Quote */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Source Quote
              </Text>

              <Text fontSize="md">{invoice.quote_number}</Text>
            </VStack>

            {/* Expiry Date */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Expiry Date
              </Text>
              {isEditing ? (
                <Input
                  name="due_date"
                  type="date"
                  value={formatDateForInput(formData.due_date)}
                  onChange={handleChange}
                  placeholder="Enter date"
                  size="md"
                />
              ) : (
                <Text fontSize="md">{invoice.due_date}</Text>
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
                  {invoice.line_items.map((item: any) => (
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

            {/* VAT rate */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                VAT Rate
              </Text>
              {isEditing ? (
                <SelectInvoiceVAT
                  vat_rate={formData.vat_rate}
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="md">{invoice.vat_rate_display}</Text>
              )}
            </VStack>

            <EditTextArea
              nameProp="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              isEditing={isEditing}
              data={invoice.notes}
              label="Notes"
            />

            <EditTextArea
              nameProp="payment_instructions"
              value={formData.payment_instructions}
              onChange={handleChange}
              placeholder="Enter payment instructions"
              isEditing={isEditing}
              data={invoice.payment_instructions}
              label="Payment Instructions"
            />

            {/* Status */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Status
              </Text>
              {isEditing ? (
                <SelectInvoiceStatus
                  status={formData.status}
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="md">{invoice.status_display}</Text>
              )}
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Footer */}
      <Button variant="ghost" onClick={() => navigate(-1)} size="md">
        ← Back to Invoices
      </Button>
    </Box>
  );
};

export default InvoiceDetailPage;
function Decimal(vat_rate: any): any {
  throw new Error("Function not implemented.");
}
