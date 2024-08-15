"use client";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import Cookies from "js-cookie";
import TransactionReport from "@/components/dashboard-admin/TransactionReport";

const DashboardAdmin = () => {
  const adminName = "Admin";

  console.log(Cookies.get("token"));

  return (
    <Flex height="100vh">
      <SidebarAdmin />
      <Box flex="1" display="flex">
        <Box flex="2" bg="none" m="4" p="4">
          <Text ml={10}>Welcome, here's your report:</Text>
          <TransactionReport />
        </Box>
        <Box flex="1" bg="none" m="4" p="4">
          <Text>Else</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardAdmin;
