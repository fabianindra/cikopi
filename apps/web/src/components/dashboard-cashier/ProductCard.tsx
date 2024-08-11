import {
  Card,
  CardBody,
  HStack,
  Heading,
  CardFooter,
  Box,
  Image,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { Coffee } from '@phosphor-icons/react';
import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import { imageUrl } from '@/api';

export default function ProductCard({
  id,
  name,
  price,
  dashboard,
  fetchProducts,
  image,
  category,
}: {
  id: number;
  name: string;
  price: number;
  dashboard: boolean;
  fetchProducts: any;
  image: string;
  category: string;
}) {
  function formatRupiah(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const handleEdit = () => {
    console.log(`Edit product with ID: ${id}`);
  };

  const handleDelete = () => {
    console.log(`Delete product with ID: ${id}`);
  };

  return (
    <Card maxW="sm" className="cursor-pointer" overflow="hidden" borderRadius="lg">
      <Image
        src={image ? `${imageUrl}/${image}` : `kopibiru.jpg`}
        objectFit="cover"
        height={250}
        alt={name}
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
      />
      <CardBody>
        <VStack align="start" spacing={2}>
          <Heading size="lg" color="brown.800">
            {name}
          </Heading>
          <Text fontSize="md" color="gray.600">
            {category}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems="center" paddingTop={0}>
        <Text fontSize="lg" fontWeight="bold" color="green.700">
          Rp. {formatRupiah(price)}
        </Text>
        {dashboard && (
          <HStack>
            <Button
              onClick={handleEdit}
              leftIcon={<PencilSimple size={20} />}
              size="sm"
              colorScheme="blue"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              leftIcon={<Trash size={20} />}
              size="sm"
              colorScheme="red"
              variant="outline"
            >
              Delete
            </Button>
          </HStack>
        )}
      </CardFooter>
    </Card>
  );
}
