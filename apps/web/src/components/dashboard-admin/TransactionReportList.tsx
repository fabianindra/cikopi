import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  IconButton,
  Text,
  Input,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { getTransactionByDate } from '@/api/transaction';
import TransactionDetailModal from './TransactionDetailsModalAdmin';
import TotalDisplayAdmin from './TotalDisplayAdmin';

const TransactionList = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!date) return;
      try {
        const response = await getTransactionByDate(date);
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [date]);

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = (transactions || []).slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalDailyTransaction = transactions.reduce(
    (total, transaction) => total + (transaction.grand_total || 0),
    0
  );

  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(transactions.length / itemsPerPage))
    );
  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const openModal = (transactionId: number) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  };

  return (
    <Box
      flex="3"
      p={20}
      bg="none"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <HStack mb={4}>
        <Text>Select Date:</Text>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </HStack>

      <TotalDisplayAdmin totalDailyTransaction={totalDailyTransaction} />

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction: any) => (
              <Tr
                key={transaction.id}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => openModal(transaction.id)}
              >
                <Td>
                  {new Date(transaction.createdAt).toLocaleString()}
                </Td>
                <Td>Rp. {transaction.grand_total.toLocaleString()}</Td>
                <Td color="gray.500" fontSize="sm">
                  Click for details
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3}>No transactions for the selected date.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <HStack justifyContent="center" mt={6}>
        <IconButton
          icon={<ArrowLeftIcon />}
          onClick={prevPage}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
        />
        <Text>{currentPage}</Text>
        <IconButton
          icon={<ArrowRightIcon />}
          onClick={nextPage}
          isDisabled={
            currentPage === Math.ceil(transactions.length / itemsPerPage)
          }
          aria-label="Next Page"
        />
      </HStack>

      <TransactionDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transactionId={selectedTransactionId}
      />
    </Box>
  );
};

export default TransactionList;
