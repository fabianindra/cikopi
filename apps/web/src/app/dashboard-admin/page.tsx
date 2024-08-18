"use client";
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import TransactionReport from "@/components/dashboard-admin/TransactionReport";
import ShiftReport from "@/components/dashboard-admin/ShiftReport";
import ProductTransactionReport from "@/components/dashboard-admin/ProductReport";
import CashCheck from "@/components/dashboard-admin/CashCheck";
import TransactionList from "@/components/dashboard-admin/TransactionReportList";

const DashboardAdmin = () => {
  return (
    <Flex height="100vh" direction={{ base: "column", md: "row" }}>
      <SidebarAdmin />
      <Box flex="1" p="10">
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Daily Report</Tab>
            <Tab>Shift Report</Tab>
            <Tab>Transaction Over Time</Tab>
            <Tab>Shift Cash Check</Tab>
            <Tab>Total Product Sales</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box p="4">
                <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Transaction Report</Text>
                <TransactionList />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="4">
                <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Shift Report</Text>
                <ShiftReport />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="4">
                <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Transaction Over Time</Text>
                <TransactionReport />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="4">
                <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Shift Cash Check</Text>
                <CashCheck />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="4">
                <Text mb={2} color="black" textAlign="center" bgColor="tertiary">Total Product Sales</Text>
                <ProductTransactionReport />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default DashboardAdmin;
