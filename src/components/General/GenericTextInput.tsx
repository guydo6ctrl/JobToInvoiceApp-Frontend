import { Field, Text, Input } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: string ;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  name: string;
  type?: string;
}
const GenericTextInput = ({
  children,
  value,
  handleChange,
  name,
  type,
}: Props) => {
  return (
    <Field.Root>
      <Text fontWeight="medium">{children}</Text>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        required
        bg="gray.50"
        _hover={{ bg: "gray.100" }}
        borderRadius="md"
      />
    </Field.Root>
  );
};

export default GenericTextInput;
