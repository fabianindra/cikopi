import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Sidebar from "@/components/Dashboard/Sidebar";

const Products = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="xl">Product</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Products