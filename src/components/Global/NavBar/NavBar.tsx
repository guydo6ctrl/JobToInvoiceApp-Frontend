import { Box, Flex, Icon, IconButton, Spacer } from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { BiSolidHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AvatarItem from "./AvatarItem";
import NavButton from "./NavButton";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.200" py={3}>
      <Flex align="center" px={4}>
        {" "}
        {/* Add px for side padding control */}
        {/* Left section */}
        <Flex align="center" gap={6}>
          <AvatarItem />
          <NavButton route="">
            <Icon as={BiSolidHome} boxSize={5} />
          </NavButton>
          <NavButton route="clients">Clients</NavButton>
          <NavButton route="quotes">Quotes</NavButton>
          <NavButton route="jobs">Jobs</NavButton>
          <NavButton route="invoices">Invoices</NavButton>
        </Flex>
        <Spacer />
        {/* Right section */}
        <Flex align="center" gap={3}>
          <IconButton
            aria-label="Settings"
            variant="ghost"
            fontSize="20px"
            onClick={() => navigate("/settings")}
          >
            {<CiSettings />}
          </IconButton>
          <NavButton route="logout">Logout</NavButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
