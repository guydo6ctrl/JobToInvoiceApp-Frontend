import React from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Card,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import useCompany from "../../hooks/useCompany";
import EditField from "../General/EditField";

interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address_line: string;
  town_or_city: string;
  postcode: string;
  country: string;
}

const EditCompanyDetailsForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { data, error, setError, isLoading } = useCompany();
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Company | null>(null);

  useEffect(() => {
    if (data[0]) {
      setFormData(data[0]);
      setCompany(data[0]);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : prev,
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await api.put(`/company/details/${company?.id}/`, formData);
      setCompany(res.data);
      setIsEditing(false);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error && !company) return <Text color="red.500">{error}</Text>;
  if (!company || !formData) return null;

  return (
    <Box maxW="800px" mx="auto" py={8}>
      <Card.Root bg="white" boxShadow="sm" mb={8}>
        <Card.Body>
          <VStack gap={6} align="stretch">
            {/* Header */}
            <VStack align="stretch">
              <HStack justify="space-between" align="start">
                <VStack align="start" gap={1}>
                  <Heading size="xl">{company.name}</Heading>
                  <Text color="gray.500" fontSize="sm">
                    Business Details
                  </Text>
                </VStack>

                {!isEditing ? (
                  <Button
                    colorPalette="brand"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <HStack gap={2}>
                    <Button
                      colorPalette="green"
                      onClick={handleSave}
                      loading={saving}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData(company);
                        setIsEditing(false);
                        setError("");
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                )}
              </HStack>
              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}
            </VStack>

            {/* Business Information */}

            <EditField
              label="Business Name"
              name="name"
              value={company.name}
              isEditing={isEditing}
              formData={formData}
              onChange={handleChange}
            />
            <EditField
              label="Email Address"
              name="email"
              value={company.email}
              isEditing={isEditing}
              formData={formData}
              onChange={handleChange}
            />
            <EditField
              label="Phone Number"
              name="phone"
              value={company.phone}
              isEditing={isEditing}
              formData={formData}
              onChange={handleChange}
            />

            {/* Address */}
            <Text fontSize="sm" fontWeight="600" color="gray.700">
              Address
            </Text>
            <EditField
              label="Street Address"
              name="address_line"
              value={company.address_line}
              isEditing={isEditing}
              formData={formData}
              onChange={handleChange}
            />
            <HStack gap={4} align="stretch">
              <Box flex={2}>
                <EditField
                  label="Town/City"
                  name="town_or_city"
                  value={company.town_or_city}
                  isEditing={isEditing}
                  formData={formData}
                  onChange={handleChange}
                />
              </Box>
              <Box flex={1}>
                <EditField
                  label="Postcode"
                  name="postcode"
                  value={company.postcode}
                  isEditing={isEditing}
                  formData={formData}
                  onChange={handleChange}
                />
              </Box>
            </HStack>
            <EditField
              label="Country"
              name="country"
              value={company.country}
              isEditing={isEditing}
              formData={formData}
              onChange={handleChange}
            />
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default EditCompanyDetailsForm;
