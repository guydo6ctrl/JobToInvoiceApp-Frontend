import { Field, NativeSelect, NativeSelectRoot, Text } from "@chakra-ui/react";
import useQuotes, { useQuotesByClient } from "../../hooks/useQuotes";

interface SelectQuoteProps {
  formData: { source_quote: string | number };
  client: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectQuote?: (quote: any) => void;
}

const SelectQuote = ({
  formData,
  client,
  handleChange,
  onSelectQuote,
}: SelectQuoteProps) => {
  const { data: quotes = [], isLoading, error } = useQuotesByClient(client);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selectedQuote = quotes.find((q) => q.id === selectedId);

    if (selectedQuote && onSelectQuote) {
      onSelectQuote(selectedQuote);
    }

    handleChange(e);
  };

  if (client === "") {
    return (
      <Field.Root>
        <Text>Quote</Text>
        <NativeSelect.Root>
          <NativeSelect.Field _disabled={{ opacity: 0.5 }}>
            <option>Select a client first</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Field.Root>
    );
  }

  return (
    <Field.Root>
      <Text>Quote</Text>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="source_quote"
          value={formData.source_quote.toString()}
          onChange={handleSelectChange}
        >
          <option value="">Select a quote</option>
          {isLoading && <option disabled>Loading quotes...</option>}
          {error && <option disabled>Error loading quotes</option>}
          {quotes.map((quote) => (
            <option key={quote.id} value={quote.id.toString()}>
              Quote #{quote.id}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectQuote;
