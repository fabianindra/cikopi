'use client'
import React, { useEffect, useState } from 'react';
import { fetchAllProduct } from "@/api/product";
import ProductCard from './ProductCard';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { Product } from '@/types'

const ProductListCashier = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await fetchAllProduct();
                setProducts(result.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    return (
        <Box p={4}>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.product_name}
                        price={product.price}
                        dashboard={false} 
                        fetchProducts={fetchAllProduct}
                        image={product.image}
                        category={product.category}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ProductListCashier;
