import { Field, NativeSelect, Text } from "@chakra-ui/react";
import useClients from "../../hooks/useClients";

interface SelectClientProps {
  formData: { client_id: string | number };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectClient = ({ formData, handleChange }: SelectClientProps) => {
  const { data: clients } = useClients();

  return (
    <Field.Root>
      <Text>Client</Text>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="client_id"
          value={formData.client_id.toString()}
          onChange={handleChange}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id.toString()}>
              {client.name}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectClient;
