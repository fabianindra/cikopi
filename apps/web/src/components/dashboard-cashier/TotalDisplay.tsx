import { Box, Text } from "@chakra-ui/react";

const TotalDisplay = ({ totalDailyTransaction }: any) => {
  return (
    <Box flex={1} p={20} bg="tertiary">
      <Text fontSize="xl" fontWeight="bold">Total Daily Transaction</Text>
      <Text fontSize="4xl" mt={4}>Rp. {totalDailyTransaction.toLocaleString()}</Text>
    </Box>
  );
};

export default TotalDisplay;
