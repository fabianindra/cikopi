import { Box, Flex, Text } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import CashierListAdmin from "@/components/dashboard-admin/CashierListAdmin";
import AddCashierForm from "@/components/dashboard-admin/AddCashierForm";

const CashierManagement = () => {
  return (
    <Flex height="100vh">
      <SidebarAdmin />
      <Box flex="1" display="flex">
        <Box flex="3" bg="none" m="4" p="4">
          <CashierListAdmin />
        </Box>
        <Box flex="1" bg="none" m="4" p="4">
          <AddCashierForm />
        </Box>
      </Box>
    </Flex>
  );
};

export default CashierManagement;
