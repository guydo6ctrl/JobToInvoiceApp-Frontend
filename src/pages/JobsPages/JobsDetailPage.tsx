import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SelectJobStatus from "../../components/JobsPageComponents/SelectJobStatus";
import SelectQuote from "../../components/General/SelectQuote";
import { brand } from "../../constants";

const JobsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}/`);
        setJob(res.data);
        setFormData(res.data);
      } catch {
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        client_id: formData.client.id,
      };
      const res = await api.put(`/jobs/${id}/`, dataToSave);
      setJob(res.data);
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
    <Box maxW="800px" mx="auto" py={4}>
      {/* Header Section */}
      <VStack align="stretch" mb={4}>
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1}>
            <Heading size="xl">{job.client.name}</Heading>
            <Text color="gray.500" fontSize="sm">
              Job Details
            </Text>
          </VStack>

          {!isEditing ? (
            <HStack>
              <Button variant="ghost" onClick={() => navigate(-1)} size="md">
                ← Back to Jobs
              </Button>
              <Button colorPalette={brand} onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </HStack>
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
                  setFormData(job);
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
            {/* Title */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Title
              </Text>
              {isEditing ? (
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  size="md"
                />
              ) : (
                <Text fontSize="md">{job.title}</Text>
              )}
            </VStack>

            {/* Description */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Description
              </Text>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  minH="100px"
                />
              ) : (
                <Text fontSize="md">{job.description}</Text>
              )}
            </VStack>

            {/* Source Quote */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Source Quote
              </Text>
              {isEditing ? (
                <SelectQuote
                  formData={formData}
                  handleChange={handleChange}
                  client={formData.client.id}
                />
              ) : (
                <Text fontSize="md">{job.quote_number ?? "Not provided"}</Text>
              )}
            </VStack>

            {/* Status */}
            <VStack gap={2} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Status
              </Text>
              {isEditing ? (
                <SelectJobStatus
                  status={formData.status}
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="md">{job.status_display}</Text>
              )}
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default JobsDetailPage;
