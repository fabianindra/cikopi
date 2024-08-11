'use client';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from "@/api/product";
import { Box, Button, Flex, Text, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Image } from '@chakra-ui/react';
import { Product } from '@/types';

const ProductListAdmin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const pageSize = 8;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await fetchProducts({
                    page: currentPage,
                    pageSize,
                    search: searchTerm || undefined,
                    category: category || undefined
                });

                setProducts(result.data.data);
                setTotalPages(Math.ceil(result.data.count / pageSize));
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [currentPage, searchTerm, category]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    return (
        <Flex direction="column" height="100%">
            <Box p={4}>
                <Flex mb={4} justify="space-between">
                    <Input
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        width="60%"
                    />
                    <Select placeholder="Filter by category" onChange={handleCategoryChange} width="30%">
                        <option value="coffee">Coffee</option>
                        <option value="nonCoffee">Non Coffee</option>
                        <option value="pastry">Pastry</option>
                    </Select>
                </Flex>
            </Box>
            <Box flex="1" overflowY="auto" p={4}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th isNumeric>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map(product => (
                            <Tr key={product.id}>
                                <Td>
                                    <Image
                                        boxSize="50px"
                                        objectFit="cover"
                                        src={product.image}
                                        alt={product.product_name}
                                    />
                                </Td>
                                <Td>{product.product_name}</Td>
                                <Td>{product.category}</Td>
                                <Td isNumeric>${product.price}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Flex justify="center" align="center" mt={4} p={4} borderTop="1px solid #e2e8f0">
                <Button onClick={handlePreviousPage} isDisabled={currentPage === 1} mr={2}>
                    Previous
                </Button>
                <Text>Page {currentPage} of {totalPages}</Text>
                <Button onClick={handleNextPage} isDisabled={currentPage === totalPages} ml={2}>
                    Next
                </Button>
            </Flex>
        </Flex>
    );
};

export default ProductListAdmin;
