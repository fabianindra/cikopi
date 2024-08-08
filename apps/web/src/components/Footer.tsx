import { Box, Container, Stack, Text, IconButton } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import NextLink from 'next/link';

export const Footer = () => {
  return (
    <div>
    <Box as="footer" bg="white" color="primary" py={6}>
      <Container maxW="container.sm">
        <Stack spacing={4} align="center" textAlign="center">
          <Stack spacing={3} direction={{ base: 'column', md: 'row' }} justify="center">
            <NextLink href="/" passHref>
              <Text fontSize="sm">Home</Text>
            </NextLink>
            <NextLink href="/about" passHref>
              <Text fontSize="sm">About</Text>
            </NextLink>
            <NextLink href="/contact" passHref>
              <Text fontSize="sm">Contact</Text>
            </NextLink>
          </Stack>

          <Stack spacing={3} direction="row" justify="center">
            <IconButton
              as="a"
              href="https://facebook.com"
              aria-label="Facebook"
              icon={<FaFacebookF />}
              variant="outline"
              colorScheme="facebook"
              size="sm"
            />
            <IconButton
              as="a"
              href="https://twitter.com"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="outline"
              colorScheme="twitter"
              size="sm"
            />
            <IconButton
              as="a"
              href="https://instagram.com"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="outline"
              colorScheme="purple"
              size="sm"
            />
          </Stack>

          <Text fontSize="xs">
            &copy; {new Date().getFullYear()} Cikopi. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
    </div>
  );
};
