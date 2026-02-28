import { Field, NativeSelect, Text } from "@chakra-ui/react";
import useCompany from "../../hooks/useCompany";

interface Props {
  vat_rate: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInvoiceVAT = ({ vat_rate, onChange }: Props) => {
  const { data } = useCompany();
  return (
    <Field.Root>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="vat_rate"
          value={vat_rate}
          bg="gray.50"
          _hover={{ bg: "gray.100" }}
          onChange={onChange}
        >
          {data[0]?.is_vat_registered ? (
            <>
              <option value="20.00">VAT RATE - 20%</option>
              <option value="5.00">VAT RATE - 5%</option>
              <option value="0.00">VAT RATE - 0%</option>
            </>
          ) : (
            <>
              <option value="0.00">VAT RATE - 0%</option>
              <option value="5.00">VAT RATE - 5%</option>
              <option value="20.00">VAT RATE - 20%</option>
            </>
          )}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectInvoiceVAT;
