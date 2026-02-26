import { Box, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
  placeholder: string;
  maxW: string;
}
const SearchInput = ({ onSearch, placeholder, maxW }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Box maxW={maxW}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) onSearch(ref.current.value);
          }}
        >
          <InputGroup startElement={<BsSearch />}>
            <Input ref={ref} borderRadius={20} placeholder={placeholder} />
          </InputGroup>
        </form>
    </Box>
  );
};

export default SearchInput;
