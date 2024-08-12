import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Text, Input, Radio, RadioGroup } from "@chakra-ui/react";
import { PaymentModalProps } from "@/types";
import { PaymentAPI } from "@/api/transaction";

const PaymentModal = ({ isOpen, onClose, totalAmount, paymentType, setPaymentType, cashAmount, setCashAmount, transaction }: PaymentModalProps) => {

    const taxRate = 0.1;
    const serviceRate = 0.05;

    const calculateTax = () => totalAmount * taxRate;
    const calculateServiceCharge = () => totalAmount * serviceRate;
    const calculateGrandTotal = () => totalAmount + calculateTax() + calculateServiceCharge();

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
            const payload = {
                products: transaction.map(product => ({
                    product_id: product.id,
                    quantity: product.quantity,
                    final_price: product.price * (product.quantity || 1),
                })),
                transactionData: {
                    sub_total: totalAmount,
                    tax: calculateTax(),
                    services: calculateServiceCharge(),
                    grand_total: calculateGrandTotal(),
                    payment_type: paymentType,
                    change: calculateChange(),
                    shift_id: 1, //dont forget to change this
                }
            };
            console.log(payload);
            const response = await PaymentAPI(payload);
            onClose();
            window.location.href = "/dashboard-cashier/products";
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
