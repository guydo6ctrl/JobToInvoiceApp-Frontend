import { Input, InputGroup, Box, VStack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Template } from "./AddQuoteForm";

interface Props {
  onSearch: (searchText: string) => void;
  onSelect: (result: Template) => void;
  results?: any[];
}

const SearchTemplatesInput = ({ onSearch, onSelect, results = [] }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [showResults, setShowResults] = useState(false);

  return (
    <Box position="relative" w="100%">
      <form
        style={{ width: "100%" }}
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) onSearch(ref.current.value);
        }}
      >
        <InputGroup startElement={<BsSearch />} w="100%">
          <Input
            ref={ref}
            placeholder="Search existing line items"
            onChange={(e) => {
              onSearch(e.target.value);
              setShowResults(true);
            }}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
        </InputGroup>
      </form>

      {/* Dropdown results */}
      {showResults && results.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="gray.100"
          borderRadius="md"
          mt={1}
          maxH="200px"
          overflowY="auto"
          zIndex={10}
        >
          <VStack align="stretch">
            {results.map((result) => (
              <Box
                key={result.id}
                p={2}
                cursor="pointer"
                _hover={{ bg: "gray.300" }}
                onClick={() => {
                  if (ref.current) ref.current.value = result.name;
                  onSelect({ ...result });
                  setShowResults(false);
                }}
              >
                <Text fontSize="sm">{result.name}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SearchTemplatesInput;
