"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Box, Heading, Flex, Text, FormControl, FormLabel, Input, Button, VStack } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";

const DashboardAdmin = () => {
    return (
      <Flex height="100vh">
        <SidebarAdmin />
        <Box flex="1">
          <Flex alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="xl">Product List</Text>
          </Flex>
        </Box>
      </Flex>
    );
  };
  
  export default DashboardAdmin
