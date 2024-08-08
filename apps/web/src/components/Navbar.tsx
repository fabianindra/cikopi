'use client';
import { Box, Flex, Heading, HStack, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { User, DecodedToken } from '@/types';
import NextLink from 'next/link';

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken && decodedToken.username && decodedToken.role) {
          setLoggedIn(true);
          setUser({ username: decodedToken.username, role: decodedToken.role });
        } else {
          throw new Error('Invalid token structure');
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
        setLoggedIn(false);
        setUser(null);
      }
    }
    setHydrated(true);
  }, [user]);

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div>
    <Box className="w-full z-50 shadow-sm">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        className="sticky bg-[#FFFFFF]"
        width="100%"
        px={{ base: '4', md: '8', lg: '16' }} 
        py={{ base: '4', md: '6', lg: '8' }} 
      >
        <NextLink href="/">
            <Heading textAlign="start" color="primary" as="h2" size="lg">
              Cikopi
            </Heading>
        </NextLink>
        <HStack>
          {loggedIn && user ? (
            <HStack spacing={4}>
              <Text fontWeight="semibold" fontSize="xs">{user.username}</Text>
              <Button 
                onClick={handleLogout} 
                colorScheme="white" 
                fontSize="2xs" 
                color="primary" 
                border="2px solid"
                borderColor="primary"
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="150px"
              height="40px"
              borderRadius="full"
              border="2px solid"
              borderColor="primary"
              backgroundColor="white"
              fontWeight="semibold"
              textAlign="center"
            >
              <Text color="grey" fontSize="2xs">You are not logged in</Text>
            </Box>
          )}
        </HStack>
      </Flex>
    </Box>
    </div>
  );
}
