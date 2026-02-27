import { Field, Text, Input, Textarea } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  name: string;
  type?: string;
}
const GenericTextAreaInput = ({
  children,
  value,
  handleChange,
  name,
  type,
}: Props) => {
  return (
    <Field.Root>
      <Text fontWeight="medium">{children}</Text>
      <Textarea
        name={name}
        value={value}
        onChange={handleChange}
        required
        bg="gray.50"
        _hover={{ bg: "gray.100" }}
        borderRadius="md"
        minH="100px"
      />
    </Field.Root>
  );
};

export default GenericTextAreaInput;
