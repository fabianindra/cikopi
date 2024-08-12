'use client'
import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";
import ProductListCashier from "@/components/dashboard-cashier/ProductList";
import TransactionForm from "@/components/dashboard-cashier/TransactionForm";
import { ProductWithQuantity } from '@/types';

const Products = () => {
  const [transaction, setTransaction] = useState<ProductWithQuantity[]>([]);

  const handleBuy = (product: ProductWithQuantity, quantity: number) => {
    setTransaction(prevTransaction => {
      const existingProduct = prevTransaction.find(item => item.id === product.id);
      if (existingProduct) {
        return prevTransaction.map(item =>
          item.id === product.id
            ? { ...item, quantity }
            : item
        );
      } else {
        return [...prevTransaction, { ...product, quantity }];
      }
    });
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setTransaction(prevTransaction => 
      prevTransaction.map(product =>
        product.id === productId
          ? { ...product, quantity: quantity <= 0 ? 1 : quantity }
          : product
      )
    );
  };

  const handleDelete = (productId: number) => {
    setTransaction(prevTransaction =>
      prevTransaction.filter(product => product.id !== productId)
    );
  };

  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1" display="flex">
        <Box flex="3" bg="none" m="4" p="4">
          <ProductListCashier onBuy={handleBuy} />
        </Box>
        <Box flex="1" bg="none" m="4" p="4">
          <TransactionForm
            transaction={transaction}
            onQuantityChange={handleQuantityChange}
            onDelete={handleDelete}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Products;
