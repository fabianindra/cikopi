'use client'
import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Heading } from "@chakra-ui/react";
import { addCashier } from '@/api/cashier';

const AddCashierForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addCashier(username, password);
      if (response.status === 201) {
        toast({
          title: "Cashier created.",
          description: "The new cashier has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setUsername('');
        setPassword('');
        window.location.href=('/dashboard-admin/cashier-management')
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add cashier.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="400px" mx="auto" p="4" borderWidth="1px" borderRadius="md">
      <Heading mb={6} size="md" color="primary" textAlign="center">
            Add New Cashier
        </Heading>
        
      <FormControl id="username" isRequired mb="4">
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </FormControl>

      <FormControl id="password" isRequired mb="4">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </FormControl>

      <Button type="submit" bgColor="tertiary" width="full">
        Add Cashier
      </Button>
    </Box>
  );
};

export default AddCashierForm;
