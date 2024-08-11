"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Box, Heading, Flex, Text, FormControl, FormLabel, Input, Button, VStack } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";

const Dashboard = () => {
  const [cashAmount, setCashAmount] = useState("");
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const cookieStatus = Cookies.get("checkin_status");
    setStatus(cookieStatus || null);
  }, []);

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString();
    setCheckInTime(now);
    setStatus("checked_in");
    Cookies.set("checkin_status", "checked_in", { expires: 1 });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString();
    setCheckOutTime(now);
    setStatus("checked_out");
    Cookies.set("checkin_status", "checked_out", { expires: 1 });
  };

  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1" p={4} bg="none">
        <Flex alignItems="center" justifyContent="center" h="50%">
          <Box width="400px" p={8} bg="none">
            <Heading as="h1" size="lg" mb={10} textAlign="center" fontSize="md" color="primary" >
              Cashier Check-In
            </Heading>
            <VStack spacing={10}>
              <FormControl id="cash-amount">
                <FormLabel fontSize="sm">Cash Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter cash amount"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                />
              </FormControl>
              {status === "checked_in" && checkInTime && (
                <Text fontSize="md" color="green.500">
                  Checked in at: {checkInTime}
                </Text>
              )}
              {status !== "checked_in" && (
                <Button colorScheme="blue" width="full" onClick={handleCheckIn} fontSize="sm">
                  Check In
                </Button>
              )}
              {status === "checked_in" && (
                <Button colorScheme="green" width="full" onClick={handleCheckOut} fontSize="sm">
                  Check Out
                </Button>
              )}
              {status === "checked_out" && checkOutTime && (
                <Text fontSize="md" color="red.500">
                  Checked out at: {checkOutTime}
                </Text>
              )}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
