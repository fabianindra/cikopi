'use client'
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import Cookies from "js-cookie";

const Logout = () => {
    const handleLogout = () => {
        Cookies.remove('token');
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