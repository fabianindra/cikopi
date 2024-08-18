'use client';
import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, FormControl, FormLabel, VStack, Flex } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { addDiscount } from '@/api/discount';

const DiscountForm = () => {
  const [discountAmount, setDiscountAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        setUserId(decodedToken.userid);
      } catch (e) {
        console.error('Failed to decode token:', e);
        setError('Invalid token');
      }
    }
  }, [token]);

  const handleDiscountSubmit = async () => {
    const confirmation = window.confirm("Are you sure you want to submit this discount?");
    if (!confirmation) {
      return;
    }
  
    try {
      if (userId !== null) {
        const response = await addDiscount(startDate, endDate, discountAmount);

        if (response.status === 201) {
          window.location.href = '/dashboard-admin/discount';
        } else {
          setError('Failed to submit discount');
          Cookies.remove('token');
          window.location.href = '/';
        }
      } else {
        setError('User ID is not available');
      }
    } catch (error: any) {
      console.error('API call error:', error);
      setError(error.response?.data?.message || 'Failed to submit discount');
      Cookies.remove('token');
      window.location.href = '/';
    }
  };

  return (
    <Flex direction="column" minHeight="50vh">
      <Flex flex="1" alignItems="center" justifyContent="center">
        <Box p={4} maxWidth="300px" width="full" color="primary">
          <VStack spacing={3}>
            {error && <Text color="red.300" fontSize="xs">{error}</Text>}
            <FormControl id="discountValue">
              <FormLabel fontSize="xs" color="black">Discount Value</FormLabel>
              <Input
                type="text"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                bg="white"
                color="black"
                fontSize="xs"
                borderRadius="md"
                placeholder="Enter discount value"
                size="sm"
              />
            </FormControl>
            <FormControl id="startDate">
              <FormLabel fontSize="xs" color="black">Start Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                bg="white"
                color="black"
                fontSize="xs"
                borderRadius="md"
                placeholder="Enter start date"
                size="sm"
              />
            </FormControl>
            <FormControl id="endDate">
              <FormLabel fontSize="xs" color="black">End Date</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                bg="white"
                color="black"
                fontSize="xs"
                borderRadius="md"
                placeholder="Enter end date"
                size="sm"
              />
            </FormControl>
            <Button mt={6} fontSize="xs" width="full" bgColor="tertiary" onClick={handleDiscountSubmit}>
              Submit
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DiscountForm;
