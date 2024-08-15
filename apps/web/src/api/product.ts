import axios from 'axios';
import { apiUrl } from './index';
import { FetchProductsParams } from '@/types';

// Fetch products API
export function fetchProducts({ page, pageSize, search, category }: FetchProductsParams) {
  return axios.get(`${apiUrl}/product/get-products`, {
    params: { page, pageSize, search, category },
  });
}

// Add product API with image upload
export function addProduct(formData: FormData) {
    return axios.post(`${apiUrl}/product/add-product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }