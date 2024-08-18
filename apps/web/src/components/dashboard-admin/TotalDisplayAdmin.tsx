import React from 'react';
import { Box, Text } from "@chakra-ui/react";

interface TotalDisplayAdminProps {
  totalDailyTransaction: number;
}

const TotalDisplayAdmin: React.FC<TotalDisplayAdminProps> = ({ totalDailyTransaction }) => {
  const formattedTotal = totalDailyTransaction.toLocaleString();

  return (
    <Box flex={1} p={20} bg="tertiary">
      <Text fontSize="xl" fontWeight="bold">Total Daily Transaction</Text>
      <Text fontSize="4xl" mt={4}>Rp. {formattedTotal}</Text>
    </Box>
  );
};

export default TotalDisplayAdmin;
