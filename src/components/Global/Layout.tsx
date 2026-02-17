
import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <NavBar />
      <Box p={6}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;