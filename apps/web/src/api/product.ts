import axios from 'axios';
import { apiUrl } from './index';
import { FetchProductsParams } from '@/types';


export function fetchProducts({ page, pageSize, search, category }: FetchProductsParams) {
  return axios.get(`${apiUrl}/product/get-products`, {
    params: { page, pageSize, search, category },
  });
}
