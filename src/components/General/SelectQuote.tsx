import { Field, NativeSelect, Text } from "@chakra-ui/react";
import useQuotes from "../../hooks/useQuotes";

interface SelectQuoteProps {
  formData: { sourceQuote: string | number };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectQuote = ({ formData, handleChange }: SelectQuoteProps) => {
  const { data: quotes } = useQuotes();
  return (
    <Field.Root>
      <Text>Quote</Text>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="quote"
          value={formData.sourceQuote}
          onChange={handleChange}
        >
          <option value="">Select a quote</option>
          {quotes.map((quote) => (
            <option key={quote.id} value={quote.id.toString()}>
              {quote.id}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectQuote;
