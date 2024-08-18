import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import DiscountForm from "@/components/dashboard-admin/DiscountForm";
import DiscountsWithPagination from "@/components/dashboard-admin/DiscountList";

const DiscountPage = () => {
  return (
    <Flex height="100vh">
      <SidebarAdmin />
      <Box flex="1" display="flex">
        <Box flex="3" bg="none" m="4" p="4">
        <DiscountForm />
        </Box>
        <Box flex="1" bg="none" m="4" p="4">
        <DiscountsWithPagination />
        </Box>
      </Box>
    </Flex>
  );
};

export default DiscountPage;
