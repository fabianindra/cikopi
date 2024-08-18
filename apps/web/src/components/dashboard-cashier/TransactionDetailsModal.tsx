import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Text, Divider, Flex, Box } from "@chakra-ui/react";
import { getTransactionDetails } from "@/api/transaction";

interface Product {
  product_name: string;
}

interface TransactionUnitWithProduct {
  id: number;
  price: number;
  quantity: string; 
  final_price: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface TransactionDetails {
  sub_total: number;
  tax: number;
  services: number;
  grand_total: number;
  payment_type: string;
  transaction_date: string;
  discount_amount?: number;
  transaction_unit: TransactionUnitWithProduct[] | undefined; 
}

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: number | null; 
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ isOpen, onClose, transactionId }) => {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [transactionUnits, setTransactionUnits] = useState<TransactionUnitWithProduct[]>([]);
  
  useEffect(() => {
    if (isOpen && transactionId) {
      const fetchTransactionDetails = async () => {
        try {
          const response = await getTransactionDetails(transactionId);
          const data = response.data.data;
          setTransaction(data);
          setTransactionUnits(data.transaction_unit || []);
        } catch (error) {
          console.error("Failed to fetch transaction details:", error);
        }
      };

      fetchTransactionDetails();
    }
  }, [isOpen, transactionId]);

  if (!transaction) return null;

  const {
    sub_total = 0,
    tax = 0,
    services = 0,
    grand_total = 0,
    payment_type = '',
    transaction_date = '',
    discount_amount = 0, 
  } = transaction;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="monospace" color="black" textAlign="center" mb={8} bgColor="tertiary">
          Transaction Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontWeight="bold" fontSize="lg" textAlign="center" fontFamily="monospace" mb={4}>
              Receipt
            </Text>
            <Divider />

            {transactionUnits.length > 0 ? (
              transactionUnits.map((unit) => (
                <React.Fragment key={unit.id}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontSize="md" fontFamily="monospace">Product: {unit.product.product_name}</Text>
                      <Text fontSize="sm" color="gray.500" fontFamily="monospace">Quantity: {unit.quantity}</Text>
                    </Box>
                  </Flex>

                  <Flex justify="space-between" fontFamily="monospace">
                    <Text>Price:</Text>
                    <Text fontWeight="bold">Rp. {unit.price.toLocaleString()}</Text>
                  </Flex>
                  <Flex justify="space-between" fontFamily="monospace">
                    <Text>Final Price:</Text>
                    <Text fontWeight="bold">Rp. {unit.final_price.toLocaleString()}</Text>
                  </Flex>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Text textAlign="center">No transaction units found.</Text>
            )}

            <Flex justify="space-between" fontFamily="monospace">
              <Text>Subtotal:</Text>
              <Text fontWeight="bold">Rp. {sub_total.toLocaleString()}</Text>
            </Flex>
            <Flex justify="space-between" fontFamily="monospace">
              <Text>Tax:</Text>
              <Text fontWeight="bold">Rp. {tax.toLocaleString()}</Text>
            </Flex>
            <Flex justify="space-between" fontFamily="monospace">
              <Text>Service Charge:</Text>
              <Text fontWeight="bold">Rp. {services.toLocaleString()}</Text>
            </Flex>

            {discount_amount > 0 && (
              <Flex justify="space-between" fontFamily="monospace" color="green.500">
                <Text>Discount:</Text>
                <Text fontWeight="bold">- Rp. {discount_amount.toLocaleString()}</Text>
              </Flex>
            )}

            <Divider />
            <Flex justify="space-between" fontFamily="monospace" color="red.500">
              <Text>Final Price:</Text>
              <Text fontWeight="bold">Rp. {grand_total.toLocaleString()}</Text>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button bgColor="tertiary" mr={3} onClick={onClose} fontFamily="monospace">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
