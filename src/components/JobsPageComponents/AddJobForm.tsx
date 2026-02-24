import { useState } from "react";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import SelectClient from "../General/SelectClient";
import SelectQuote from "../General/SelectQuote";

interface JobFormData {
  client_id: string;
  title: string;
  description: string;
  source_quote: string;
}

const defaultFormData = {
  client_id: "",
  title: "",
  description: "",
  source_quote: "",
};

const AddJobForm = ({ endpoint }: { endpoint: string }) => {
  const [formData, setFormData] = useState<JobFormData>(defaultFormData);

  const { submit, error, loading } = useFormSubmit({
    endpoint,
    onSuccess: () => {
      setFormData(defaultFormData);
      alert("Job added successfully");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="md"
      maxW="700px"
      mx="auto"
      mt={8}
    >
      <Heading size="lg" mb={6} textAlign="center">
        Add New Job
      </Heading>

      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Box>
            <SelectClient formData={formData} handleChange={handleChange} />
          </Box>

          <Box>
            <SelectQuote
              formData={formData}
              handleChange={handleChange}
              client={formData.client_id}
            />
          </Box>
        </SimpleGrid>

        <VStack align="stretch" gap={4} mt={4}>
          <Field.Root>
            <Text>Title</Text>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Text>Description</Text>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Field.Root>
        </VStack>

        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="blue"
          mt={6}
          w="full"
          loading={loading}
        >
          Add Job
        </Button>
      </form>
    </Box>
  );
};

export default AddJobForm;
