'use client'
import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { getAllDiscount } from "@/api/discount";
import { Discount } from "@/types";

const ITEMS_PER_PAGE = 5;

const DiscountsWithPagination = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDiscounts = async () => {
    try {
      const response = await getAllDiscount();
      console.log(response.data.result);
      if (Array.isArray(response.data.result)) {
        setDiscounts(response.data.result);
      } else {
        setDiscounts([]);
      }
    } catch (error) {
      console.error("Error fetching discounts:", error);
      setDiscounts([]);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const totalPages = Math.ceil(discounts.length / ITEMS_PER_PAGE);

  const paginatedDiscounts = discounts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
    }).format(value / 100);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <Box flex="1" bg="none" m="4" p="4">
      <Heading as="h2" size="md" mb="4">Discounts List</Heading>
      <VStack spacing="4" align="start">
        {paginatedDiscounts.map((discount) => (
          <Box key={discount.id} p="4" borderWidth="1px" borderRadius="md">
            <Text color="primary" mb="4">Value: {formatPercentage(discount.discount_amount)}</Text>
            <Text>
              Start Date: {formatDate(discount.start_date)}
            </Text>
            <Text>
              End Date: {formatDate(discount.end_date)}
            </Text>
          </Box>
        ))}
      </VStack>
      <HStack spacing="4" mt="4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default DiscountsWithPagination;
