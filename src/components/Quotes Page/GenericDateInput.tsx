import { Field, Input, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  value: string;
  children: ReactNode;
  name: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}
const GenericDateInput = ({ value, children, name, onChange }: Props) => {
  return (
    <Field.Root>
      <Text>{children}</Text>
      <Input
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        placeholder="01-01-2000"
      />
    </Field.Root>
  );
};

export default GenericDateInput;
