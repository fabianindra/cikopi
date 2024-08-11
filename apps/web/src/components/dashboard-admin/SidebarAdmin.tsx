'use client'
import React from 'react';
import { useState } from 'react';
import { Flex, IconButton, Divider } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiHome, FiShoppingCart, FiClipboard, FiLogOut } from 'react-icons/fi';
import NavItem from './NavItemAdmin';
import { User } from '@/types';
import Cookies from 'js-cookie';

const SidebarAdmin: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const [navSize, setNavSize] = React.useState<'small' | 'large'>(() => {
    if (typeof window !== 'undefined') {
      const savedSize = localStorage.getItem('navSize');
      return savedSize === 'small' ? 'small' : 'large';
    }
    return 'large';
  });

  const pathname = usePathname();

  const toggleNavSize = () => {
    const newSize = navSize === 'small' ? 'large' : 'small';
    setNavSize(newSize);
    if (typeof window !== 'undefined') {
      localStorage.setItem('navSize', newSize);
    }
  };

  const getNavItemProps = (path: string) => ({
    active: pathname === path,
    href: path,
  });

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };


  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === 'small' ? '15px' : '15px'}
      w={navSize === 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
      zIndex="1000"
      pointerEvents="auto"
      bgColor="travertine"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          aria-label='Toggle sidebar'
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={toggleNavSize}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="Admin" {...getNavItemProps('/dashboard-admin')} />
        <NavItem navSize={navSize} icon={FiShoppingCart} title="Products" {...getNavItemProps('/dashboard-admin/product-list')} />
        <NavItem navSize={navSize} icon={FiClipboard} title="Cashier" {...getNavItemProps('/dashboard-admin/cashier-management')} />
        <NavItem
          navSize={navSize}
          icon={FiLogOut}
          title="Logout"
          onClick={handleLogout} 
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize === 'small' ? 'none' : 'flex'} />
      </Flex>
    </Flex>
  );
};

export default SidebarAdmin;
