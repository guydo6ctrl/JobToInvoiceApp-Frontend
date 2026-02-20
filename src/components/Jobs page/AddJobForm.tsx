import { useState } from "react";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import SelectClient from "../General/SelectClient";
import SelectQuote from "../General/SelectQuote";

interface JobFormData {
  client: string;
  title: string;
  description: string;
  sourceQuote: string;
}

const defaultFormData = {
  client: "",
  title: "",
  description: "",
  sourceQuote: "",
};

const AddJobForm = (endpoint: string) => {
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
      <Heading>Add New Job</Heading>
      <SelectClient formData={formData} handleChange={handleChange} />

      <Field.Root>
        <Text>Title</Text>

        <Input />
      </Field.Root>

      <Field.Root>
        <Text>Description</Text>

        <Input />
      </Field.Root>

      <SelectQuote formData={formData} handleChange={handleChange} />

      {error && <Text>{error}</Text>}

      <Button type="submit" loading={loading}>
        Add Job
      </Button>
    </form>
  );
};

export default AddJobForm;
