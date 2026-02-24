import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <Box py={4}>
        <NavBar />
      </Box>
      <Box p={6}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
