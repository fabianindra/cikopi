import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";

const Report = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1">
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="xl">Report</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Report