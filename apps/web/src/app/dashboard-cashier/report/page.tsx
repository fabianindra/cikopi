'use client'

import { Box, Heading, Flex, Text, Spinner, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Divider } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";
import { useEffect, useState } from "react";
import { getTransactionByDate, getTransactionDetails } from "@/api/transaction";

const Report = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalDailyTransaction, setTotalDailyTransaction] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const date = new Date().toISOString().split("T")[0];
        const response = await getTransactionByDate(date);
        const fetchedTransactions = response.data.data;
        setTransactions(fetchedTransactions);
        setTotalDailyTransaction(
          fetchedTransactions.reduce((acc: number, transaction: any) => acc + transaction.grand_total, 0)
        );
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionClick = async (transactionId: number) => {
    try {
      const response = await getTransactionDetails(transactionId);
      setSelectedTransaction(response.data.data);
      setIsModalOpen(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="3" p={20} bg="none">
        <Heading mb={6}>Transaction Report</Heading>
        <VStack spacing={4} align="stretch">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Box
                key={transaction.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="white"
                boxShadow="sm"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleTransactionClick(transaction.id)}
              >
                <Text fontWeight="bold">{new Date(transaction.createdAt).toLocaleString()}</Text>
                <Text>Amount: Rp. {transaction.grand_total}</Text>
                <Text color="gray.500" fontSize="sm">Click for details</Text>
              </Box>
            ))
          ) : (
            <Text>No transactions today.</Text>
          )}
        </VStack>
      </Box>
      <Box flex={1} p={20} bg="tertiary">
        <Text fontSize="xl" fontWeight="bold">Total Daily Transaction</Text>
        <Text fontSize="4xl" mt={4}>Rp. {totalDailyTransaction.toLocaleString()}</Text>
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent maxWidth="sm" mx={4}>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTransaction ? (
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold" fontSize="lg" textAlign="center">Receipt</Text>
                <Divider />
                {selectedTransaction.map((item: any) => (
                  <Flex key={item.id} justify="space-between">
                    <Box>
                      <Text fontSize="md">{item.quantity} x</Text>
                      <Text fontSize="md">{new Date(item.createdAt).toLocaleString()}</Text>
                    </Box>
                    <Text fontSize="md">Rp. {item.final_price}</Text>
                  </Flex>
                ))}
                <Divider />
                <Text fontWeight="bold" fontSize="md" textAlign="right">
                  Total: Rp. {selectedTransaction.reduce((acc: number, item: any) => acc + item.final_price, 0)}
                </Text>
              </VStack>
            ) : (
              <Text>Loading...</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Report;