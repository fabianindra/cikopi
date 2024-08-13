import axios from 'axios';
import { apiUrl } from './index';
import { FetchProductsParams } from '@/types';


export function fetchProducts({ page, pageSize, search, category }: FetchProductsParams) {
  return axios.get(`${apiUrl}/product/get-products`, {
    params: { page, pageSize, search, category },
  });
}

export function addProduct({
    product_name,
    price,
    stock,
    category,
    image,
    userId,
    partner,
    consignment_fee,
  }: {
    product_name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    userId: number;
    partner?: string;
    consignment_fee?: number;
  }) {
    return axios.post(`${apiUrl}/product/add-product`, {
      product_name,
      price,
      stock,
      category,
      image,
      userId,
      partner,
      consignment_fee,
    });
  }