"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import TransactionReport from "@/components/dashboard-admin/TransactionReport";
import ShiftReport from "@/components/dashboard-admin/ShiftReport";
import ProductTransactionReport from "@/components/dashboard-admin/ProductReport";
import CashCheck from "@/components/dashboard-admin/CashCheck";

const DashboardAdmin = () => {
  return (
    <Flex height="100vh" direction={{ base: "column", md: "row" }}>
      <SidebarAdmin />
      <Box
        flex="1"
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(2, 1fr)" }}
        gridGap="4"
        p="4"
      >
        <Box bg="none" p="4">
        <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Shift Report</Text>
          <ShiftReport />
        </Box>
        <Box bg="none" p="4">
        <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Transaction Report</Text>
          <TransactionReport />
        </Box>
        <Box bg="none" p="4">
        <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Shift Cash Check</Text>
          <CashCheck />
        </Box>
        <Box bg="none" p="4">
          <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Total Product Sales</Text>
          <ProductTransactionReport />
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardAdmin;
