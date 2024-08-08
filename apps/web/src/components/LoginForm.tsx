'use client';
import { useState } from 'react';
import { Box, Text, Input, Button, FormControl, FormLabel, VStack, Heading } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { Login } from '@/api/auth';

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

        Cookies.set('token', userToken, { expires: 1 });

        onLoginSuccess(userToken);
        setError('');
        window.location.href = '/dashboard';
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
        <Heading as="h3" size="sm" mb={10} color="primary">
          Please login to continue
        </Heading>
        {error && <Text color="red.300">{error}</Text>}
        <FormControl id="username">
          <FormLabel fontSize="xs">Username</FormLabel>
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
          <FormLabel fontSize="xs">Password</FormLabel>
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

        <Button fontSize="xs" width="full" colorScheme="blue" onClick={handleLogin}>
          Log in
        </Button>
      </VStack>
    </Box>
    </div>
  );
};

export default LoginForm;
