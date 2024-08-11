'use client'
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "@/types"
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import Cookies from "js-cookie";


const Logout = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const handleLogout = () => {
        Cookies.remove('token');
        setLoggedIn(false);
        setUser(null);
        window.location.href = '/';
      };
    
  return (
    <Flex height="100vh">
      <SidebarAdmin />
      <Box flex="1">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="xl">Logout</Text>
          <Button onClick={handleLogout}>Logout</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Logout