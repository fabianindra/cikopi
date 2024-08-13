'use client';
import { useState } from 'react';
import { Box, Text, Input, Button, FormControl, FormLabel, VStack, Heading } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { Login } from '@/api/auth';
import { jwtDecode } from 'jwt-decode';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Login(username, password);

      if (response.status === 201 && response.data) {
        const userToken = response.data.token;
        let role = '';
        try {
          const decodedToken: any = jwtDecode(userToken);
          role = decodedToken.role;
        } catch (decodeError) {
          console.error('Token decoding failed', decodeError);
          setError('Failed to decode token');
          return;
        }

        Cookies.set('token', userToken, { expires: 1 });

        onLoginSuccess(userToken);
        setError('');
        if (role == "admin") {
          window.location.href = '/dashboard-admin';
        }
        else {window.location.href = '/checkin';}
      } else {
        setError('Login failed: Invalid response data');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
    <Box p={6} color="primary">
      <VStack spacing={4}>
        {error && <Text color="red.300">{error}</Text>}
        <FormControl id="username">
          <FormLabel fontSize="sm" color="black">Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="white"
            color="black"
            fontSize="xs"
            borderRadius="md"
            _placeholder={{ color: 'gray.400', fontSize: 'sm' }}
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel fontSize="sm" color="black">Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="white"
            color="black"
            fontSize="xs"
            borderRadius="md"
            _placeholder={{ color: 'gray.400', fontSize: 'sm' }}
          />
        </FormControl>

        <Button mt={4} fontSize="xs" width="full" bgColor="tertiary" onClick={handleLogin}>
          Log in
        </Button>
      </VStack>
    </Box>
    </div>
  );
};

export default LoginForm;
