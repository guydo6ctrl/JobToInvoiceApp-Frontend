import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  Spinner,
  VStack,
  Card,
  HStack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const ClientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/clients/${id}/`);
        setClient(res.data);
        setFormData(res.data);
      } catch {
        setError("Failed to load client");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put(`/clients/${id}/`, formData);
      setClient(res.data);
      setIsEditing(false);
    } catch {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box maxW="800px" mx="auto" py={8}>
      {/* Header Section */}
      <VStack align="stretch" mb={8}>
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1}>
            <Heading size="xl">{client.name}</Heading>
            <Text color="gray.500" fontSize="sm">
              Client Details
            </Text>
          </VStack>

          {!isEditing ? (
            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <HStack gap={2}>
              <Button colorScheme="green" onClick={handleSave} loading={saving}>
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(client);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </HStack>
          )}
        </HStack>
      </VStack>

      {/* Content Section */}
      <Card.Root mb={8} bg="white" boxShadow="sm">
        <Card.Body>
          <VStack gap={6} align="stretch">
            {/* Email */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Email Address
              </Text>
              {isEditing ? (
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  size="md"
                />
              ) : (
                <Text fontSize="md">{client.email}</Text>
              )}
            </VStack>

            {/* Phone */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Phone Number
              </Text>
              {isEditing ? (
                <Input
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  size="md"
                />
              ) : (
                <Text fontSize="md">{client.phone || "Not provided"}</Text>
              )}
            </VStack>

            {/* Address */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Address
              </Text>
              {isEditing ? (
                <Textarea
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  placeholder="Enter address"
                  minH="100px"
                />
              ) : (
                <Text fontSize="md" whiteSpace="pre-wrap">
                  {client.address || "Not provided"}
                </Text>
              )}
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Footer */}
      <Button variant="ghost" onClick={() => navigate("/clients")} size="md">
        ← Back to Clients
      </Button>
    </Box>
  );
};

export default ClientDetailPage;
