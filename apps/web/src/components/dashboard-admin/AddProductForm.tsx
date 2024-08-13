'use client';
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Heading } from "@chakra-ui/react";
import { addProduct } from '@/api/product';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const AddProductForm = () => {
  const [product_name, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [partner, setPartner] = useState('');
  const [consignment_fee, setConsignmentFee] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.userid);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addProduct({
        product_name,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        image,
        userId: userId!,
        partner: partner || undefined,
        consignment_fee: consignment_fee ? parseFloat(consignment_fee) : undefined,
      });

      if (response.status === 201) {
        toast({
          title: "Product created.",
          description: "The new product has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setProductName('');
        setPrice('');
        setStock('');
        setCategory('');
        setImage('');
        setPartner('');
        setConsignmentFee('');
        window.location.href = '/dashboard-admin/product-management';
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="400px" mx="auto" p="4" borderWidth="1px" borderRadius="md">
         <Heading mb={6} size="md" color="primary" textAlign="center">
            Add New Product
        </Heading>

      <FormControl id="product_name" isRequired mb="3">
        <FormLabel fontSize="sm">Product Name</FormLabel>
        <Input
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          fontSize="sm"
        />
      </FormControl>

      <FormControl id="price" isRequired mb="3">
        <FormLabel fontSize="sm">Price</FormLabel>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          fontSize="sm"
        />
      </FormControl>

      <FormControl id="stock" isRequired mb="3">
        <FormLabel fontSize="sm">Stock</FormLabel>
        <Input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter stock quantity"
          fontSize="sm"
        />
      </FormControl>

      <FormControl id="category" isRequired mb="3">
        <FormLabel fontSize="sm">Category</FormLabel>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter product category"
          fontSize="sm"
        />
      </FormControl>

      <FormControl id="image" isRequired mb="3">
        <FormLabel fontSize="sm">Image URL</FormLabel>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
          fontSize="sm"
        />
      </FormControl>

      <FormControl id="partner" mb="3">
        <FormLabel fontSize="sm">Partner (Optional)</FormLabel>
        <Input
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
          placeholder="Enter partner name"
          fontSize="sm"
        />
      </FormControl>

      <FormControl id="consignment_fee" mb="4">
        <FormLabel fontSize="sm">Consignment Fee (Optional)</FormLabel>
        <Input
          type="number"
          value={consignment_fee}
          onChange={(e) => setConsignmentFee(e.target.value)}
          placeholder="Enter consignment fee"
          fontSize="sm"
        />
      </FormControl>

      <Button type="submit" bgColor="tertiary" width="full" mt={6}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
