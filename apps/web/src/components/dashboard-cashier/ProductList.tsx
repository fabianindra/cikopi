'use client'
import React, { useEffect, useState } from 'react';
import { fetchProducts } from "@/api/product";
import ProductCard from './ProductCard';
import { SimpleGrid, Box, Button, Flex, Text, Input, Select } from '@chakra-ui/react';
import { Product, ProductWithQuantity } from '@/types';
import { debounce } from 'lodash';

interface ProductListCashierProps {
  onBuy: (product: ProductWithQuantity, quantity: number) => void;
}

const ProductListCashier: React.FC<ProductListCashierProps> = ({ onBuy }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const pageSize = 8;

    useEffect(() => {
        const debouncedFetchProducts = debounce(async () => {
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
        }, 300);

        debouncedFetchProducts();

        return () => {
            debouncedFetchProducts.cancel();
        };
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
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        width="60%"
                        fontSize="sm"
                    />
                    <Select placeholder="Category" onChange={handleCategoryChange} width="30%" fontSize="sm">
                        <option value="coffee">Coffee</option>
                        <option value="nonCoffee">Non Coffee</option>
                        <option value="pastry">Pastry</option>
                    </Select>
                </Flex>
            </Box>
            <Box flex="1" overflowY="auto" p={4}>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.product_name}
                            price={product.price}
                            image={product.image}
                            category={product.category}
                            onBuy={onBuy}
                        />
                    ))}
                </SimpleGrid>
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

export default ProductListCashier;
