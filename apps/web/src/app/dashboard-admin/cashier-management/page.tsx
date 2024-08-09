import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";

const CashierManagement = () => {
  return (
    <Flex height="100vh">
      <SidebarAdmin />
      <Box flex="1">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="xl">Cashier Management</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CashierManagement