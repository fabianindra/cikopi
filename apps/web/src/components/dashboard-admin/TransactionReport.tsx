'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, Button, HStack, Input, InputGroup, InputRightElement, Select, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, VStack, Divider, Flex
} from '@chakra-ui/react';
import { MagnifyingGlass,SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getTransactionAdmin, getTransactionDetails } from '@/api/transaction';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const TransactionReport = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>('transaction_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactionAdmin(startDate, endDate, category, sortBy, sortDirection);
        setTransactions(response.data.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [sortBy, sortDirection, startDate, endDate, category]);

  const handleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  const handleTransactionClick = async (transactionId: number) => {
    try {
      const response = await getTransactionDetails(transactionId);
      setSelectedTransaction(response.data.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching transaction details:', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const chartData = {
    labels: transactions.map((transaction) =>
      new Date(transaction.transaction_date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Grand Total',
        data: transactions.map((transaction) => transaction.grand_total),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Transactions Over Time',
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
    },
  };

  return (
    <Box mb={5} p={3} fontSize="sm">
      <HStack my={5} justifyContent="space-between" wrap="wrap">
        <InputGroup w={250} mb={3}>
          <Input
            type="date"
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
            fontSize="sm"
          />
          <InputRightElement>
            <MagnifyingGlass size={16} />
          </InputRightElement>
        </InputGroup>
        <InputGroup w={250} mb={3}>
          <Input
            type="date"
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
            fontSize="sm"
          />
          <InputRightElement>
            <MagnifyingGlass size={16} />
          </InputRightElement>
        </InputGroup>
        <Select
          placeholder="Select Category"
          onChange={(e) => setCategory(e.target.value)}
          mb={3}
          w={250}
          fontSize="sm"
        >
          <option value="Coffee">Coffee</option>
          <option value="Non Coffee">Non Coffee</option>
          <option value="Pastry">Pastry</option>
        </Select>
        <HStack mb={3}>
          <Select onChange={(e) => setSortBy(e.target.value)} placeholder="Sort By" fontSize="sm">
            <option value="transaction_date">Date</option>
            <option value="grand_total">Total Amount</option>
          </Select>
          <Button onClick={handleSortDirection} colorScheme="gray" size="sm">
            {sortDirection === 'asc' ? (
              <SortAscending size={20} />
            ) : (
              <SortDescending size={20} />
            )}
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Box height="300px">
          <Line data={chartData} options={chartOptions} />
        </Box>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th fontSize="sm">Total</Th>
                <Th fontSize="sm">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr
                  key={transaction.id}
                  onClick={() => handleTransactionClick(transaction.id)}
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                >
                  <Td fontSize="sm">{transaction.grand_total}</Td>
                  <Td fontSize="sm">{new Date(transaction.transaction_date).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent maxWidth="sm" mx={4}>
          <ModalCloseButton />
          <ModalBody>
            {selectedTransaction ? (
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold" fontSize="lg" textAlign="center" mt={10}>Transaction Details</Text>
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
            <Button bgColor="tertiary" onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TransactionReport;
