import axios from 'axios';
import { apiUrl } from './index';
import { FetchProductsParams } from '@/types';


export function fetchProducts({ page, pageSize, search, category }: FetchProductsParams) {
  return axios.get(`${apiUrl}/product/get-products`, {
    params: { page, pageSize, search, category },
  });
}

export function addProduct(formData: FormData) {
    return axios.post(`${apiUrl}/product/add-product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

export function editProduct(productId: number, formData: FormData) {
    return axios.post(`${apiUrl}/product/edit-product/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

export function deleteProduct(productId: number) {
    return axios.post(`${apiUrl}/product/delete-product`, {productId});
  }