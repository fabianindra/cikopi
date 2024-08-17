'use client'
import React, { useEffect, useState } from 'react';
import { fetchCashiers, deleteCashier, editCashier } from "@/api/cashier";
import CashierCard from './CashierCard';
import CashierEditModal from './CashierEditModal';
import { SimpleGrid, Box, Button, Flex, Text, Input, Select } from '@chakra-ui/react';
import { Cashier, GetCashiersParams } from '@/types';
import { debounce } from 'lodash';

const CashierListAdmin: React.FC = () => {
    const [cashiers, setCashiers] = useState<Cashier[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedCashier, setSelectedCashier] = useState<Cashier | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const pageSize = 8;

    useEffect(() => {
        const debouncedFetchCashiers = debounce(async () => {
            try {
                const params: GetCashiersParams = {
                    page: currentPage.toString(),
                    pageSize: pageSize.toString(),
                    search: searchTerm || undefined,
                    sortBy: sortBy || undefined,
                    sortDirection: 'asc'
                };

                const result = await fetchCashiers(params);
                const cashiersData = result.data.data.data.result;
                setCashiers(Array.isArray(cashiersData) ? cashiersData : []);
                setTotalPages(Math.ceil((result.data.data.count || 0) / pageSize));
            } catch (error) {
                console.log(error);
            }
        }, 600); 

        debouncedFetchCashiers();

        return () => {
            debouncedFetchCashiers.cancel();
        };
    }, [currentPage, searchTerm, sortBy]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const handleEdit = (id: string) => {
        const cashierToEdit = cashiers.find(cashier => cashier.id === id) || null;
        setSelectedCashier(cashierToEdit);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async (id: string, username: string, password: string) => {
        try {
            await editCashier(id, username, password);
            setCashiers(prevCashiers =>
                prevCashiers.map(cashier =>
                    cashier.id === id
                        ? { ...cashier, username }
                        : cashier
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCashier(id);
            setCashiers(prevCashiers => prevCashiers.filter(cashier => cashier.id !== id));
            console.log(`Deleted cashier with id: ${id}`);
        } catch (error) {
            console.log(error);
        }
};


    return (
        <Flex direction="column" height="100%">
            <Box p={4}>
                <Flex mb={4} justify="space-between">
                    <Input
                        placeholder="Search Cashiers"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        width="60%"
                        fontSize="sm"
                    />
                    <Select placeholder="Sort By" onChange={handleSortByChange} width="30%" fontSize="sm">
                        <option value="username">Username</option>
                        <option value="createdAt">Created At</option>
                    </Select>
                </Flex>
            </Box>
            <Box flex="1" overflowY="auto" p={4}>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                    {cashiers.map(cashier => (
                        <CashierCard
                            key={cashier.id}
                            id={cashier.id}
                            username={cashier.username}
                            role={cashier.role}
                            createdAt={cashier.createdAt}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </SimpleGrid>
            </Box>
            <Flex justify="center" align="center" mt={4} p={4} borderTop="1px solid #e2e8f0">
                <Button onClick={handlePreviousPage} isDisabled={currentPage === 1} mr={2}>
                    Previous
                </Button>
                <Text>Page {currentPage} of {totalPages}</Text>
                <Button onClick={handleNextPage} isDisabled={currentPage === totalPages} ml={2}>
                    Next
                </Button>
            </Flex>

            {selectedCashier && (
                <CashierEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    id={selectedCashier.id}
                    currentUsername={selectedCashier.username}
                    currentRole={selectedCashier.role}
                    onSave={handleSaveEdit}
                />
            )}
        </Flex>
    );
};

export default CashierListAdmin;
