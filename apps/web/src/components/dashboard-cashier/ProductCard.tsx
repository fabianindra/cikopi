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
import React from 'react';
import { imageUrl } from '@/api';

export default function ProductCard({
  name,
  price,
  image,
  category,
}: {
  id: number;
  name: string;
  price: number;
  dashboard: boolean;
  image: string;
  category: string;
}) {
  function formatRupiah(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <Card maxW="sm" className="cursor-pointer" overflow="hidden" borderRadius="lg">
      <Image
        src={image ? `${imageUrl}/${image}` : `kopibiru.jpg`}
        objectFit="cover"
        height={150}
        alt={name}
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
      />
      <CardBody>
        <VStack align="start" spacing={2}>
          <Heading size="md" color="primary">
            {name}
          </Heading>
          <Text fontSize="sm" color="secondary">
            {category}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems="center" paddingTop={0}>
        <Text fontSize="md" fontWeight="bold" color="black">
          Rp. {formatRupiah(price)}
        </Text>
      </CardFooter>
    </Card>
  );
}
