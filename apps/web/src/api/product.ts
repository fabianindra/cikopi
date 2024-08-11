import axios from 'axios';
import { apiUrl } from './index';

export function fetchAllProduct() {
  return axios.get(`${apiUrl}/product/get-all-products`);
}