'use client'
import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Input, Select } from '@chakra-ui/react';
import { Product, EditProductModalProps } from '@/types';
import { editProduct } from '@/api/product';

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product, onSave }) => {
    const [editedProduct, setEditedProduct] = useState<Product | null>(product);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setEditedProduct(product);
        setImageFile(null);
    }, [product]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (editedProduct) {
            setEditedProduct({
                ...editedProduct,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        if (editedProduct) {
            const productId = editedProduct.id;
            const formData = new FormData();
            formData.append('product_name', editedProduct.product_name);
            formData.append('price', editedProduct.price !== undefined ? String(Number(editedProduct.price)) : '');
            formData.append('stock', editedProduct.stock !== undefined ? String(Number(editedProduct.stock)) : '');
            formData.append('category', editedProduct.category);
            if (imageFile) {
                formData.append('image', imageFile);
            }
            formData.append('partner', editedProduct.partner || '');
            formData.append('consignment_fee', editedProduct.consignment_fee !== undefined ? String(Number(editedProduct.consignment_fee)) : '');
            

            if (window.confirm('Are you sure you want to edit?')) {
                try {
                    await editProduct(productId, formData);
                    onSave(editedProduct);
                    
                    window.location.href = '/dashboard-admin/product-list';
                    onClose();
                } catch (error) {
                    console.error('Error updating product:', error);
                }
              }
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center" color="primary">Edit Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {editedProduct && (
                        <Flex direction="column" gap={3}>
                            <Input
                                name="product_name"
                                placeholder="Product Name"
                                value={editedProduct.product_name}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="price"
                                placeholder="Price"
                                type="number"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="stock"
                                placeholder="Stock"
                                type="number"
                                value={editedProduct.stock}
                                onChange={handleInputChange}
                            />
                            <Select
                                name="category"
                                value={editedProduct.category}
                                onChange={handleInputChange}
                            >
                                <option value="coffee">Coffee</option>
                                <option value="nonCoffee">Non Coffee</option>
                                <option value="pastry">Pastry</option>
                            </Select>
                            <Input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <Input
                                name="partner"
                                placeholder="Partner"
                                value={editedProduct.partner || ''}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="consignment_fee"
                                placeholder="Consignment Fee"
                                type="number"
                                value={editedProduct.consignment_fee !== undefined ? String(editedProduct.consignment_fee) : ''}
                                onChange={handleInputChange}
                            />
                        </Flex>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button bgColor="maroon" color="travertine" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button bgColor="tertiary" onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProductModal;
