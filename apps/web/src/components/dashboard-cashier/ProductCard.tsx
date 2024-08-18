import {
  Card,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { imageUrl } from '@/api';
import { Product } from '@/types';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  onBuy,
}: {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  onBuy: (product: Product, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  function formatRupiah(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Card maxW="xs" className="cursor-pointer" overflow="hidden" borderRadius="md">
      <Image
        src={image ? `${imageUrl}/${image}` : `kopibiru.jpg`}
        objectFit="cover"
        height={120}
        alt={name}
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
      />
      <CardBody>
        <VStack align="start" spacing={1}>
          <Heading size="sm" color="primary" mb={1}>
            {name}
          </Heading>
          <Text fontSize="xs" color="black" mb={1}>
            {category}
          </Text>
        </VStack>
        <Text fontSize="md" fontWeight="bold" color="black">
          Rp. {formatRupiah(price)}
        </Text>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems="center" paddingTop={0}>
        <HStack spacing={1}>
          <IconButton
            aria-label="Decrease quantity"
            icon={<FaMinus />}
            onClick={decreaseQuantity}
            size="sm"
          />
          <Text fontSize="sm">
            {quantity}
          </Text>
          <IconButton
            aria-label="Increase quantity"
            icon={<FaPlus />}
            onClick={increaseQuantity}
            size="sm"
          />
        </HStack>
        <Button
          bgColor="tertiary"
          size="sm"
          onClick={() => onBuy({ id, product_name: name, price, image, category }, quantity)}
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
