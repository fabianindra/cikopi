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
  } from '@chakra-ui/react';
  import { Coffee } from '@phosphor-icons/react';
  import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';
  import React from 'react';
  import { imageUrl } from '@/api';
  
  export default function CustomCardProduct({
    id,
    name,
    price,
    dashboard,
    fetchProducts,
    image,
  }: {
    id: number;
    name: string;
    price: number;
    dashboard: boolean;
    fetchProducts: any;
    image: string;
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
      <Card maxW="xs" className="cursor-pointer" pb={4}>
        <CardBody>
          <Image
            src={
              image
                ? `${imageUrl}/${image}`
                : `kopibiru.jpg`
            }
            objectFit="cover"
            height={200}
            width={400}
            alt={name}
            borderRadius="lg"
          />
  
          <Heading size="md" mt={4}>
            {name}
          </Heading>
        </CardBody>
        <CardFooter flexDirection={'column'}>
          <HStack justifyContent={'space-between'}>
            <HStack>
              <Coffee size={20} weight="fill" />
            </HStack>
            <Box>
              <Text fontSize={'md'} fontWeight={'bold'}>
                Rp. {formatRupiah(price)}
              </Text>
            </Box>
          </HStack>
          {dashboard ? (
            <HStack justifyContent={'end'} mb={4} mt={6}>
              <Button
                onClick={handleEdit}
                rightIcon={<PencilSimple size={20} />}
                colorScheme="blue"
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                rightIcon={<Trash size={20} />}
                colorScheme="red"
              >
                Delete
              </Button>
            </HStack>
          ) : null}
        </CardFooter>
      </Card>
    );
  }
  