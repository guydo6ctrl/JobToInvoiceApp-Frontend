import { Field, NativeSelect, Text } from "@chakra-ui/react";
import useBanks from "../../hooks/useBanks";

interface SelectPaymentProps {
  formData: { payment_details: string | number };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  label?: string;
}

const SelectPaymentOptions = ({
  label,
  formData,
  onChange,
}: SelectPaymentProps) => {
  const { data: payment = [], isLoading, error } = useBanks();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading payment details</p>;
  if (!payment || payment.length === 0) return <p>No payment details found</p>;

  return (
    <Field.Root>
      <Text>{label}</Text>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="payment_details"
          value={formData.payment_details}
          bg="gray.50"
          _hover={{ bg: "gray.100" }}
          onChange={onChange}
        >
          <option value="">Select payment details</option>

          {isLoading && <option disabled>Loading payment details...</option>}
          {error && <option disabled>Error loading payment details </option>}
          {payment.map((payment) => (
            <option key={payment.id} value={payment.id}>
              {payment.bank_name} - {payment.account_number}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectPaymentOptions;
