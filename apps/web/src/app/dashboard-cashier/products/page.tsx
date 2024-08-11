'use client'
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";
import ProductListCashier from "@/components/dashboard-cashier/ProductList";

const Products = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1" display="flex">
        <Box flex="3" bg="none" m="4" p="4">
          <ProductListCashier />
        </Box>
        <Box flex="1" bg="none" m="4" p="4">
          <Text>Transaction</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Products