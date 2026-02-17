import { Button, Flex, IconButton } from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import AvatarItem from "./AvatarItem";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Flex justifyContent="space-between" p={1} gap={4}>
      <Flex justify="flex-start" gap={4}>
        <AvatarItem />
        <Button bg="white" color="black" onClick={() => navigate("/clients")}>
          Clients
        </Button>
        <Button bg="white" color="black" onClick={() => navigate("/jobs")}>
          Jobs
        </Button>
        <Button bg="white" color="black" onClick={() => navigate("/quotes")}>
          Quotes
        </Button>
        <Button bg="white" color="black" onClick={() => navigate("/invoices")}>
          Invoices
        </Button>
      </Flex>
      <Flex gap={4}>
        <IconButton
          variant="outline"
          onClick={() => navigate("/settings")}
          aria-label="Settings"
        >
          {<CiSettings />}
        </IconButton>
        <Button bg="white" color="black" onClick={() => navigate("/logout")}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
