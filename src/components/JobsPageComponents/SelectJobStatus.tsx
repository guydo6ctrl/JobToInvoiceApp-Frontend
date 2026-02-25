import { Field, NativeSelect, Text } from "@chakra-ui/react";

interface Props {
  status: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectJobStatus = ({ status, onChange }: Props) => {
  return (
    <Field.Root>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="status"
          value={status}
          onChange={onChange}
          bg="gray.50"
          _hover={{ bg: "gray.100" }}
        >
          <option value="">Select status</option>
          <option value="scheduled">Scheduled</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectJobStatus;
