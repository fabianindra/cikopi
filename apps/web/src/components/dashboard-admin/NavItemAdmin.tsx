import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { NavItemProps } from '@/types';

const NavItem: React.FC<NavItemProps> = ({ navSize, icon, title, description, active, href, onClick }) => {
  const IconComponent = icon;

  const content = (
    <Flex
      p={3}
      align="center"
      mb={2}
      borderRadius="md"
      _hover={{ bg: 'gray.200' }}
      bg={active ? 'blue.100' : 'none'}
      color={active ? 'blue.600' : 'inherit'}
      cursor="pointer"
      onClick={onClick}
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
  );

  return href ? (
    <NextLink href={href} passHref>
      {content}
    </NextLink>
  ) : (
    content
  );
};

export default NavItem;
