import React from 'react';
import { Box, Text, VStack, Button, HStack } from '@chakra-ui/react';
import { CashierCardProps } from '@/types';

const CashierCard: React.FC<CashierCardProps> = ({ id, username, role, createdAt, onEdit, onDelete }) => {
  const handleEdit = () => {
      onEdit(id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      onDelete(id);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow="md" p={4} bg="white">
      <VStack align="start" spacing={3}>
        <Text fontWeight="bold" fontSize="2xl" color="primary">
          {username}
        </Text>
        <Text color="gray.600">
          <strong>Role:</strong> {role}
        </Text>
        <Text color="gray.600">
          <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
        </Text>

        <HStack spacing={2} mt={8}>
          <Button bgColor="tertiary" onClick={handleEdit}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CashierCard;
