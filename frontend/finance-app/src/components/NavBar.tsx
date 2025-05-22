import { HStack, Text } from "@chakra-ui/react";
// import ColorModeSwitch from "@/components/ColorModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack bg="background" justifyContent="space-between" padding="10px">
      <HStack>
        <Link to="/">
          <Text>Finance Menager</Text>
        </Link>
      </HStack>
      <HStack marginRight="20px">
        <Link to="/home">
          <Text>Home</Text>
        </Link>
        <Link to="/login">
          <Text>Login</Text>
        </Link>
        <Link to="/register">
          <Text>Sign Up</Text>
        </Link>
      </HStack>
      <HStack>Help</HStack>
    </HStack>
  );
};

export default NavBar;
