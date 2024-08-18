'use client';
import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, FormControl, FormLabel, VStack, Flex } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { CheckIn } from '@/api/shift';
import { jwtDecode } from 'jwt-decode';
import Nav from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
    const confirmation = window.confirm("Are you sure you want to submit this cash amount?");
    if (!confirmation) {
      return;
    }

    console.log('Cash Amount:', cashAmount);
    console.log('User ID:', userId);
  
    try {
      if (userId !== null) {
        const response = await CheckIn(cashAmount, userId);

        if (response.status === 201) {
          if (response && response.token) {
            Cookies.set('shift', response.token, { expires: 8/24 });
          } else {
            throw new Error('Token not found in response');
          }

          window.location.href = '/dashboard-cashier/products';
        } else {
          setError('Failed to submit cash amount');
          Cookies.remove('token');
          Cookies.remove('shift');
          window.location.href = '/';
        }
      } else {
        setError('User ID is not available');
      }
    } catch (error: any) {
      console.error('API call error:', error);
      setError(error.response?.data?.message || 'Failed to submit cash amount');
      Cookies.remove('token');
      Cookies.remove('shift');
      window.location.href = '/';
    }
  };

  const handleCancelLogin = () => {
    const confirmation = window.confirm("Are you sure you want to cancel?");
    if (confirmation) {
      Cookies.remove('token');
      window.location.href = '/';
    }
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Nav />
      <Flex flex="1" alignItems="center" justifyContent="center">
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
            <Button mt={6} fontSize="xs" width="full" bgColor="secondary" onClick={handleCancelLogin}>
              Cancel
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default CheckInPage;
