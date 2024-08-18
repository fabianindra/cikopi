import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Text, Input, Radio, RadioGroup } from "@chakra-ui/react";
import { PaymentModalProps } from "@/types";
import { PaymentAPI } from "@/api/transaction";
import { getDiscount } from "@/api/discount";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const getCurrentDateInGMT7 = () => {
    const now = new Date();
    const offset = 7 * 60;
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + offset);
    return now.toISOString().split('T')[0];
};

const PaymentModal = ({ isOpen, onClose, totalAmount, paymentType, setPaymentType, cashAmount, setCashAmount, transaction }: PaymentModalProps) => {
    const [discount, setDiscount] = useState<number | null>(null);

    const taxRate = 0.1;
    const serviceRate = 0.05;

    useEffect(() => {
        if (isOpen) {
            const fetchDiscount = async () => {
                try {
                    const today = getCurrentDateInGMT7();
                    const response = await getDiscount(today);
                    if (response.data) {
                        setDiscount(response.data.result.discount_amount);
                    }
                } catch (error) {
                    console.error('Error fetching discount:', error);
                }
            };
            fetchDiscount();
        }
    }, [isOpen]);

    const calculateDiscountedTotal = () => {
        if (discount) {
            return totalAmount * (1 - (discount / 100));
        }
        return totalAmount;
    };

    const calculateDiscountAmount = () => {
        if (discount) {
            return totalAmount * (discount / 100);
        }
        return totalAmount;
    };

    const calculateTax = () => calculateDiscountedTotal() * taxRate;
    const calculateServiceCharge = () => calculateDiscountedTotal() * serviceRate;

    const calculateGrandTotal = () => {
        const discountedTotal = calculateDiscountedTotal();
        return discountedTotal + calculateTax() + calculateServiceCharge();
    };
    

    const handlePaymentTypeChange = (type: string) => {
        setPaymentType(type);
        if (type !== 'cash') {
            setCashAmount('');
        }
    };

    const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCashAmount(value === '' ? '' : parseFloat(value));
    };

    const calculateChange = () => {
        const amount = typeof cashAmount === 'number' ? cashAmount : 0;
        if (paymentType === 'cash' && amount > calculateGrandTotal()) {
            return amount - calculateGrandTotal();
        }
        return 0;
    };

    const handlePaymentConfirm = async () => {
        try {
            const shiftToken = Cookies.get("shift");
            if (shiftToken) {
                let shiftId: number | undefined;

                try {
                    const decodedToken: any = jwtDecode(shiftToken);
                    shiftId = decodedToken.shiftId;
                } catch (error) {
                    console.error("Failed to decode shift token:", error);
                    return;
                }

                if (shiftId === undefined) {
                    console.error("Shift ID is undefined");
                    return;
                }

                const payload = {
                    products: transaction.map(product => ({
                        product_id: product.id,
                        quantity: product.quantity,
                    })),
                    shift_id: shiftId,
                    payment_type: paymentType,
                    payment: paymentType === 'cash' ? cashAmount : calculateGrandTotal(),
                };

                const response = await PaymentAPI(payload);
                onClose();
                window.location.href = "/dashboard-cashier/products";
            }
        } catch (error: any) {
            if (error.response) {
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontFamily="monospace" color="black" textAlign="center" mb="8" bgColor="tertiary">Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <RadioGroup onChange={handlePaymentTypeChange} value={paymentType} mb={12}>
                        <Flex direction="column" mb="4" fontFamily="monospace">
                            <Radio value="cash">Cash</Radio>
                            <Radio value="card">Card</Radio>
                            <Radio value="qris">QRIS</Radio>
                        </Flex>
                    </RadioGroup>

                    <Flex direction="column" mb={8}>
                        <Text mb={8} color="primary">Transaction</Text>
                        <Flex direction="column" fontFamily="monospace">
                            <Flex justify="space-between">
                                <Text>Total:</Text>
                                <Text fontWeight="bold">Rp. {totalAmount.toLocaleString()}</Text>
                            </Flex>
                            <Flex justify="space-between" mt={2}>
                                <Text>Tax (10%):</Text>
                                <Text fontWeight="bold">Rp. {calculateTax().toLocaleString()}</Text>
                            </Flex>
                            <Flex justify="space-between" mt={2}>
                                <Text>Service Charge (5%):</Text>
                                <Text fontWeight="bold">Rp. {calculateServiceCharge().toLocaleString()}</Text>
                            </Flex>
                            {discount && (
                                <Flex justify="space-between" mt={2}>
                                    <Text>Discount ({discount}%):</Text>
                                    <Text fontWeight="bold">Rp. {(calculateDiscountAmount()).toLocaleString()}</Text>
                                </Flex>
                            )}
                            <Flex justify="space-between" mt={2}>
                                <Text>Grand Total:</Text>
                                <Text fontWeight="bold" color="red.500">Rp. {calculateGrandTotal().toLocaleString()}</Text>
                            </Flex>
                            {paymentType === 'cash' && (
                                <Flex direction="column" mt={4}>
                                    <Text mb={2}>Cash Amount</Text>
                                    <Input
                                        type="number"
                                        value={cashAmount === '' ? '' : cashAmount}
                                        onChange={handleCashChange}
                                        placeholder="Enter cash amount"
                                        min={0}
                                        size="sm"
                                    />
                                </Flex>
                            )}
                            {paymentType === 'cash' && typeof cashAmount === 'number' && cashAmount > calculateGrandTotal() && (
                                <Flex mt={4} fontFamily="monospace" justify="space-between">
                                    <Text mb={4}>Change:</Text>
                                    <Text color="green.500" fontWeight="bold">Rp. {calculateChange().toLocaleString()}</Text>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button bgColor="tertiary" mr={3} onClick={handlePaymentConfirm} fontFamily="monospace">
                        Confirm
                    </Button>
                    <Button variant="ghost" onClick={onClose} fontFamily="monospace">Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PaymentModal;
