import React from 'react';
import { Box, Text, Flex, VStack, Button } from '@chakra-ui/react';
import { CashierCardProps } from '@/types';

const CashierCard: React.FC<CashierCardProps> = ({ id, username, role, createdAt }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg="white"
    >
      <VStack align="start" spacing={3}>
        <Text fontWeight="bold" fontSize="lg">
          {username}
        </Text>
        <Text color="gray.600">
          <strong>Role:</strong> {role}
        </Text>
        <Text color="gray.600">
          <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default CashierCard;
