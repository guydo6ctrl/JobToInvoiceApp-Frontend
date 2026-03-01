import { Box, Textarea, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  nameProp: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}
const TextAreaInput = ({
  label,
  nameProp,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <Box>
      <Text mb={1}>{label}</Text>
      <Textarea
        name={nameProp}
        value={value}
        onChange={onChange}
        bg="gray.50"
        _hover={{ bg: "gray.100" }}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default TextAreaInput;
