import { Box, VStack, Text, HStack, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

const TransactionList = ({ transactions, onTransactionClick }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(transactions.length / itemsPerPage)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <Box flex="3" p={20} bg="none" display="flex" flexDirection="column" justifyContent="space-between" height="100%">
      <VStack spacing={4} align="stretch" flex="1">
        {currentTransactions.length > 0 ? (
          currentTransactions.map((transaction: any) => (
            <Box
              key={transaction.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="white"
              boxShadow="sm"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => onTransactionClick(transaction.id)}
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
          isDisabled={currentPage === Math.ceil(transactions.length / itemsPerPage)} 
          aria-label="Next Page" 
        />
      </HStack>
    </Box>
  );
};

export default TransactionList;
