import { Box, Button } from "@chakra-ui/react";
import { brand } from "../../constants";

interface Props {
  loading: boolean;
  label: string;
}
const AddNewDataButton = ({ loading, label }: Props) => {
  return (
    <Button
      w="100%"
      type="submit"
      colorPalette={brand}
      mt={2}
      loading={loading}
      size="md"
      // onClick={() => setTimeout(() => window.location.reload(), 100)}
    >
      Add {label}
    </Button>
  );
};

export default AddNewDataButton;
