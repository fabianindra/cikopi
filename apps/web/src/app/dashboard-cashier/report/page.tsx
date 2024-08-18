'use client'

import { Flex, Spinner, Text } from "@chakra-ui/react";
import Sidebar from "@/components/dashboard-cashier/Sidebar";
import { useEffect, useState } from "react";
import { getTransactionByDate, getTransactionByDateById } from "@/api/transaction";
import TransactionList from "@/components/dashboard-cashier/TransactionList";
import TotalDisplay from "@/components/dashboard-cashier/TotalDisplay";
import TransactionDetailModal from "@/components/dashboard-cashier/TransactionDetailsModal";
import { Transaction } from "@/types";
import Cookies from "js-cookie";

const Report = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalDailyTransaction, setTotalDailyTransaction] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const date = new Date();
        const currentTimezoneOffsetInHours = date.getTimezoneOffset() / 60;
        const gmtPlus7Offset = 7;
        date.setHours(date.getHours() + (gmtPlus7Offset - currentTimezoneOffsetInHours));
        const adjustedDate = date.toISOString().split("T")[0];


        const token = Cookies.get("token")
        if (token) {
          const response = await getTransactionByDateById(adjustedDate, token);
          const fetchedTransactions = response.data.data;

          setTransactions(fetchedTransactions);
          setTotalDailyTransaction(
            fetchedTransactions.reduce((acc: number, transaction: Transaction) => acc + transaction.grand_total, 0)
          );
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionClick = (transactionId: number) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
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
      <TransactionList transactions={transactions} onTransactionClick={handleTransactionClick} />
      <TotalDisplay totalDailyTransaction={totalDailyTransaction} />

      <TransactionDetailModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        transactionId={selectedTransactionId} 
      />
    </Flex>
  );
};

export default Report;
