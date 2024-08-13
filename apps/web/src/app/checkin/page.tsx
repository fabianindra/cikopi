'use client';
import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, FormControl, FormLabel, VStack, Flex } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { CheckIn } from '@/api/shift';
import { jwtDecode } from 'jwt-decode';

const CheckInPage = () => {
  const [cashAmount, setCashAmount] = useState('');
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

  const handleCashAmountSubmit = async () => {
    console.log('Cash Amount:', cashAmount);
    console.log('User ID:', userId);

    try {
      if (userId !== null) {
        const response = await CheckIn(cashAmount, userId);

        if (response.status === 201) {
          window.location.href = '/dashboard-cashier/products';
        } else {
          setError('Failed to submit cash amount');
          Cookies.remove('token');
          window.location.href = '/';
        }
      }
    } catch (error: any) {
      console.error('API call error:', error);
      setError(error.response?.data?.message || 'Failed to submit cash amount');
      Cookies.remove('token');
      window.location.href = '/';
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={4} maxWidth="300px" width="full" color="primary">
        <VStack spacing={3}>
          {error && <Text color="red.300" fontSize="xs">{error}</Text>}
          <FormControl id="cashAmount">
            <FormLabel fontSize="xs" color="black">Cash Amount</FormLabel>
            <Input
              type="text"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              bg="white"
              color="black"
              fontSize="xs"
              borderRadius="md"
              placeholder="Enter cash amount"
              size="sm"
            />
          </FormControl>
          <Button mt={6} fontSize="xs" width="full" bgColor="tertiary" onClick={handleCashAmountSubmit}>
            Submit
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default CheckInPage;
