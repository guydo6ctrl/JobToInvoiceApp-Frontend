import { Field, NativeSelect, Text } from "@chakra-ui/react";

interface Props {
  status: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectQuoteStatus = ({ status, onChange }: Props) => {
  return (
    <Field.Root>
      <Text>Status</Text>
      <NativeSelect.Root>
        <NativeSelect.Field name="status" value={status} onChange={onChange}>
          <option value="">Select status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Accepted</option>
          <option value="rejected">Rejected</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectQuoteStatus;
