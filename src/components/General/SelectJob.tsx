import { Field, NativeSelect, Text } from "@chakra-ui/react";
import { useJobsByClient } from "../../hooks/useJobs";

interface SelectJobProps {
  formData: { job: string | number };
  client: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectQuote?: (quote: any) => void;
}

const SelectJob = ({
  formData,
  client,
  handleChange,
  onSelectQuote,
}: SelectJobProps) => {
  const { data: jobs = [], isLoading, error } = useJobsByClient(client);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selectedQuote = jobs.find((q) => q.id === selectedId);

    if (selectedQuote && onSelectQuote) {
      onSelectQuote(selectedQuote);
    }

    handleChange(e);
  };

  if (client === "") {
    return (
      <Field.Root>
        <Text>Job</Text>
        <NativeSelect.Root>
          <NativeSelect.Field _disabled={{ opacity: 0.5 }}>
            <option>Select a client first</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Field.Root>
    );
  }

  return (
    <Field.Root>
      <Text>Job</Text>
      <NativeSelect.Root>
        <NativeSelect.Field
          name="job"
          value={formData.job.toString()}
          bg="gray.50"
          _hover={{ bg: "gray.100" }}
          onChange={handleSelectChange}
        >
          <option value="">Select a job</option>
          {isLoading && <option disabled>Loading jobs...</option>}
          {error && <option disabled>Error loading jobs</option>}
          {jobs.map((job) => (
            <option key={job.id} value={job.id.toString()}>
              Job: {job.title}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default SelectJob;
