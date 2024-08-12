'use client'
import React, { useState } from "react";
import { Box, Text, Flex, Divider, VStack, Button, IconButton } from "@chakra-ui/react";
import PaymentModal from "./PaymentModal";
import { TransactionFormProps } from '@/types';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

const TransactionForm = ({ transaction, onQuantityChange, onDelete }: TransactionFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentType, setPaymentType] = useState<string>('cash');
    const [cashAmount, setCashAmount] = useState<number | ''>('');

    const total = transaction.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);

    return (
        <Flex direction="column" p={4} bgColor="white" borderRadius="md" h="100%">
            <Text fontSize="lg" fontWeight="bold" mb={8} color="primary" textAlign="center">
                Transaction Summary
            </Text>
            <Divider mb={4} />
            <Box flex="1" overflowY="auto" maxH="calc(100% - 96px)" mb={4}>
                <VStack spacing={4} align="stretch">
                    {transaction.map(product => (
                        <Flex
                            key={product.id}
                            p={3}
                            borderWidth={1}
                            borderRadius="md"
                            borderColor="secondary"
                            direction="column"
                            bgColor="white"
                            position="relative"
                        >
                            <IconButton
                                aria-label="Delete"
                                icon={<FaTrashAlt />}
                                position="absolute"
                                top={2}
                                right={2}
                                size="sm"
                                colorScheme="red"
                                onClick={() => onDelete(product.id)}
                            />
                            <Text fontSize="lg" fontWeight="semibold" color="secondary">
                                {product.product_name}
                            </Text>
                            <Text fontSize="md">Price: Rp. {product.price.toLocaleString()}</Text>
                            <Flex align="center" mt={2}>
                                <IconButton
                                    aria-label="Decrease Quantity"
                                    icon={<FaMinus />}
                                    size="sm"
                                    onClick={() => onQuantityChange(product.id, (product.quantity || 1) - 1)}
                                    isDisabled={(product.quantity || 1) <= 1}
                                />
                                <Text mx={4}>{product.quantity}</Text>
                                <IconButton
                                    aria-label="Increase Quantity"
                                    icon={<FaPlus />}
                                    size="sm"
                                    onClick={() => onQuantityChange(product.id, (product.quantity || 1) + 1)}
                                />
                            </Flex>
                            <Text fontSize="md" mt={2}>Total: Rp. {(product.price * (product.quantity || 1)).toLocaleString()}</Text>
                        </Flex>
                    ))}
                </VStack>
            </Box>
            <Divider mt={4} mb={4} />
            <Flex justify="space-between" fontWeight="bold">
                <Text fontSize="lg">Grand Total:</Text>
                <Text fontSize="lg">
                    Rp. {total.toLocaleString()}
                </Text>
            </Flex>
            <Button mt={4} bgColor="tertiary" onClick={() => setIsModalOpen(true)}>
                Confirm Payment
            </Button>
            <PaymentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                totalAmount={total}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
                cashAmount={cashAmount}
                setCashAmount={setCashAmount}
                transaction={transaction}
            />
        </Flex>
    );
};

export default TransactionForm;
