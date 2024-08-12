'use client';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Box, Button, Image, Text } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { User } from '@/types';
import LoginForm from '@/components/LoginForm';
import Nav from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    const decodedUser = jwtDecode<User>(token);
    setIsLoggedIn(true);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  const handleDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div>
      <Nav />
      <Box>
        {isLoggedIn ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
            width="100vw"
          >
            <Button onClick={handleDashboard}>
              Go to Dashboard
            </Button>
            <Button
              colorScheme="primary"
              onClick={handleLogout}
              fontSize="md"
              color="primary"
            >
              Logout
            </Button>
          </Box>
        ) : (
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
        )}
      </Box>
      <Footer />
    </div>
  );
}
