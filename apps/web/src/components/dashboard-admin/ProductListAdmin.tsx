'use client';
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from "@/api/product"; // Ensure deleteProduct is imported
import { Box, Button, Flex, Text, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Image } from '@chakra-ui/react';
import { Product } from '@/types';
import { imageUrl } from '@/api/index';
import EditProductModal from './EditProductModal';
import { debounce } from 'lodash';

const ProductListAdmin = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        }, 600);

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

    const formatRupiah = (amount: number) => {
        return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    const handleEditProduct = (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            setIsEditModalOpen(true);
        }
    };

    const handleSaveProduct = (updatedProduct: Product) => {
        setProducts(prevProducts =>
            prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
        window.location.href = '/dashboard-admin/product-list';
    };

    const handleDeleteProduct = async (productId: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            try {
                await deleteProduct(productId);
                setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
                console.log(`Deleted product with ID: ${productId}`);
            } catch (error) {
                console.log('Failed to delete product:', error);
            }
        } else {
            console.log('Delete action was canceled.');
        }
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
                            <Th>Stock</Th>
                            <Th>Partner</Th>
                            <Th>Fee %</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map(product => (
                            <Tr key={product.id}>
                                <Td>
                                    <Image
                                        boxSize="50px"
                                        objectFit="cover"
                                        src={`${imageUrl}/${product.image}`}
                                        alt={product.product_name}
                                    />
                                </Td>
                                <Td>{product.product_name}</Td>
                                <Td>{product.category}</Td>
                                <Td isNumeric>{formatRupiah(product.price)}</Td>
                                <Td>{product.stock}</Td>
                                <Td>{product.partner}</Td>
                                <Td>{product.consignment_fee ? `${product.consignment_fee}%` : 'N/A'}</Td>
                                <Td>
                                    <Button
                                        bgColor="secondary"
                                        size="sm"
                                        onClick={() => handleEditProduct(product.id)}
                                    >
                                        Edit
                                    </Button>
                                </Td>
                                <Td>
                                    <Button
                                        bgColor="maroon"
                                        color="travertine"
                                        size="sm"
                                        onClick={() => handleDeleteProduct(product.id)} // Call the delete function
                                    >
                                        Delete
                                    </Button>
                                </Td>
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

            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={selectedProduct}
                onSave={handleSaveProduct}
            />
        </Flex>
    );
};

export default ProductListAdmin;
