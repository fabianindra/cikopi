'use client'
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";
import ProductListCashier from "@/components/dashboard-cashier/ProductList";

const Products = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <ProductListCashier />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Products