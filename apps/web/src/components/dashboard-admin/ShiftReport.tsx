'use client';

import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Input, Button, Flex, Select } from '@chakra-ui/react';
import { ShiftReportData } from '@/types';
import { getShiftReport } from '@/api/shift';

const ShiftReport: React.FC = () => {
  const [reportData, setReportData] = useState<ShiftReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('2024-01-01');
  const [endDate, setEndDate] = useState<string>('2024-12-31');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getShiftReport(startDate, endDate);
      setReportData(response.data.data);
    } catch (err) {
      setError('Failed to fetch shift report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  const handleFetchReport = () => {
    fetchReport();
  };

  const formatRupiah = (amount: number) => {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reportData.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
  };

  return (
    <Box p={4} bg="none">
      <Flex mb={4}>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          mr={2}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          mr={2}
        />
        <Button onClick={handleFetchReport} bgColor="tertiary" fontSize="xs">Get</Button>
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
                <Th>Date of Transaction</Th>
                <Th>User</Th>
                <Th>Opening Balance</Th>
                <Th>Closing Balance</Th>
                <Th>Total Transactions</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="xs">
              {currentItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{formatDate(item.date)}</Td>
                  <Td>{item.user}</Td>
                  <Td>{item.cash_balance_opening ? formatRupiah(item.cash_balance_opening) : 'N/A'}</Td>
                  <Td>{item.cash_balance_closing ? formatRupiah(item.cash_balance_closing) : 'N/A'}</Td>
                  <Td>{item.total_transactions ? formatRupiah(item.total_transactions) : 'N/A'}</Td>
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

export default ShiftReport;
