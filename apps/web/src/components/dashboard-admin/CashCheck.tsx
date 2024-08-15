'use client';

import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Button, Flex, Select, Input } from '@chakra-ui/react';
import { ShiftData } from '@/types';
import { getCashCheck } from '@/api/shift';

const CashCheck: React.FC = () => {
  const [reportData, setReportData] = useState<ShiftData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCashCheck(selectedDate);
      console.log(response.data.data);

      if (Array.isArray(response.data.data)) {
        setReportData(response.data.data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (err) {
      setError('Failed to fetch cash check');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchReport();
  }, [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reportData.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = Number(event.target.value);
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatRupiah = (amount: number) => {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  return (
    <Box p={4} bg="none">
      <Flex mb={4}>
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          mr={2}
        />
        <Button onClick={fetchReport} bgColor="tertiary" fontSize="xs">Get</Button>
      </Flex>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Cashier</Th>
                <Th>Cash Balance Opening</Th>
                <Th>Cash Balance Closing</Th>
                <Th>Total Price</Th>
                <Th>Cash Balance Check</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="xs">
              {currentItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.user}</Td>
                  <Td>{formatRupiah(item.cash_balance_opening)}</Td>
                  <Td>{formatRupiah(item.cash_balance_closing)}</Td>
                  <Td>{formatRupiah(item.totalPrice)}</Td>
                  <Td>{formatRupiah(item.cash_balance_check)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex mt={4} justifyContent="space-between" alignItems="center">
            <Text>Page:</Text>
            <Select width="auto" onChange={handlePageChange} value={currentPage}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>{page}</option>
              ))}
            </Select>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CashCheck;
