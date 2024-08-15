'use client';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { User } from '@/types';
import LoginForm from '@/components/LoginForm';
import Nav from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
      setRole(decodedUser.role);

      if (decodedUser.role === 'admin') {
        window.location.href = '/dashboard-admin';
      } else if (decodedUser.role === 'cashier') {
        window.location.href = '/dashboard-cashier/products';
      }
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    const decodedUser = jwtDecode<User>(token);
    setIsLoggedIn(true);
    setUser(decodedUser);
    setRole(decodedUser.role);

    if (decodedUser.role === 'admin') {
      window.location.href = '/dashboard-admin';
    } else if (decodedUser.role === 'cashier') {
      window.location.href = '/dashboard-cashier';
    }
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Nav />
      <Box flex="1">
        {!isLoggedIn ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
            width="100vw"
            boxSizing="border-box"
          >
            <Text fontSize="md" fontFamily="monospace">
              Please log in to continue
            </Text>
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Image
                src="/kopibiru.jpg"
                alt="Coffee Picture"
                boxSize={{ base: "100%", md: "50%" }}
                objectFit="cover"
                mr={{ md: 4 }}
              />
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </Box>
          </Box>
        ) : null}
      </Box>
      <Footer />
    </Flex>
  );
}
