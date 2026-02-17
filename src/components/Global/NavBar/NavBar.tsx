import { Button, Flex, IconButton } from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import AvatarItem from "./AvatarItem";
import NavButton from "./NavButton";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Flex justifyContent="space-between" p={1} gap={4}>
      <Flex justify="flex-start" gap={4}>
        <AvatarItem />
        <NavButton route="">Home</NavButton>
        <NavButton route="clients">Clients</NavButton>
        <NavButton route="jobs">Jobs</NavButton>
        <NavButton route="quotes">Quotes</NavButton>
        <NavButton route="invoices">Invoices</NavButton>
      </Flex>
      <Flex gap={4}>
        <IconButton
          variant="outline"
          onClick={() => navigate("/settings")}
          aria-label="Settings"
        >
          {<CiSettings />}
        </IconButton>
        <NavButton route="logout">Logout</NavButton>
      </Flex>
    </Flex>
  );
};

export default NavBar;
