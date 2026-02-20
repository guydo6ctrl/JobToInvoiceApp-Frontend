import { useState } from "react";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { Box, Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import SelectClient from "../General/SelectClient";
import SelectQuote from "../General/SelectQuote";

interface JobFormData {
  client: string;
  title: string;
  description: string;
  source_quote: string;
}

const defaultFormData = {
  client: "",
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
    <form onSubmit={handleSubmit}>
      <Heading size="lg" mb={6}>
        Add New Job
      </Heading>
      <Box>
        <SelectClient formData={formData} handleChange={handleChange} />
        <Field.Root>
          <Text>Title</Text>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </Field.Root>
        <Field.Root>
          <Text>Description</Text>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Field.Root>
        <SelectQuote
          formData={formData}
          handleChange={handleChange}
          client={formData.client}
        />
        {error && <Text>{error}</Text>}
        <Button type="submit" colorScheme="blue" mt={6} loading={loading}>
          Add Job
        </Button>
      </Box>
    </form>
  );
};

export default AddJobForm;
