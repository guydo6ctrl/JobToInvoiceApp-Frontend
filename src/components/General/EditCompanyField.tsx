import { VStack, Text, Input } from "@chakra-ui/react";
import { Company } from "../../hooks/useCompany";

interface FieldProps {
  label: string;
  name: keyof Company;
  value?: string;
  isEditing: boolean;
  formData: Company;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditCompanyField = ({
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
      <Input
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

export default EditCompanyField;
