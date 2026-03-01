import { Textarea, VStack, Text } from "@chakra-ui/react";

interface Props {
  isEditing: boolean;
  data: string;
  nameProp: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => void;
}
const EditTextArea = ({
  isEditing,
  label,
  data,
  value,
  nameProp,
  placeholder,
  onChange,
}: Props) => {
  return (
    <VStack gap={2} align="stretch">
      <Text fontSize="sm" fontWeight="600" color="gray.600">
        {label}
      </Text>
      {isEditing ? (
        <Textarea
          name={nameProp}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          size="md"
          minH="100px"
        />
      ) : (
        <Text fontSize="md">{data}</Text>
      )}
    </VStack>
  );
};

export default EditTextArea;
