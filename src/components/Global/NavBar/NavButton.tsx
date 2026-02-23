import { Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode ;
  route: string;
}
const NavButton = ({ children, route }: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      bg="white"
      color="black"
      onClick={() => navigate(`/${route}`)}
    >
      {children}
    </Button>
  );
};

export default NavButton;
