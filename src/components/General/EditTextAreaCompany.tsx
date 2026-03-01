import { VStack, Text, Input, Textarea } from "@chakra-ui/react";
import { Company } from "../../hooks/useCompany";

interface FieldProps {
  label: string;
  name: keyof Company;
  value?: string;
  isEditing: boolean;
  formData: Company;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditTextAreaCompany = ({
  label,
  name,
  value,
  isEditing,
  formData,
  onChange,
}: FieldProps) => (
  <VStack gap={2} align="stretch">
    <Text fontSize="sm" fontWeight="600" color="gray.600">
      {label}
    </Text>
    {isEditing ? (
      <Textarea
        name={name}
        value={(formData[name] as string) || ""}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        size="md"
      />
    ) : (
      <Text fontSize="md">{value || "Not provided"}</Text>
    )}
  </VStack>
);

export default EditTextAreaCompany;
