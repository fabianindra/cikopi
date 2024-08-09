import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';

interface NavItemProps {
  navSize: 'small' | 'large';
  icon: React.ElementType;
  title: string;
  description?: string;
  active?: boolean;
  href: string;
}

const NavItemAdmin: React.FC<NavItemProps> = ({ navSize, icon, title, description, active, href }) => {
  const IconComponent = icon;

  return (
    <NextLink href={href} passHref>
      <Flex
        p={3}
        align="center"
        mb={2}
        borderRadius="md"
        _hover={{ bg: 'gray.200' }}
        bg={active ? 'blue.100' : 'none'}
        color={active ? 'blue.600' : 'inherit'}
        cursor="pointer"
      >
        <Icon as={IconComponent} w={6} h={6} color={active ? 'blue.600' : 'inherit'} />
        <Flex
          ml={4}
          direction="column"
          display={navSize === 'small' ? 'none' : 'flex'}
        >
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          {description && (
            <Text fontSize="sm" color="gray.600">
              {description}
            </Text>
          )}
        </Flex>
      </Flex>
    </NextLink>
  );
};

export default NavItemAdmin;
