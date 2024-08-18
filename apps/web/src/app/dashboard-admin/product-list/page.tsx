import { Box, Flex } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import ProductListAdmin from "@/components/dashboard-admin/ProductListAdmin";
import AddProductForm from "@/components/dashboard-admin/AddProductForm";

const ProductAdmin = () => {
  return (
    <Flex height="100vh">
      <SidebarAdmin />
      <Box flex="1" display="flex">
        <Box flex="3" bg="none" m="4" p="4">
          <ProductListAdmin />
        </Box>
        <Box flex="1" bg="none" m="4" p="4">
          <AddProductForm />
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductAdmin