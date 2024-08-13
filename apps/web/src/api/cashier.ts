import axios from 'axios';
import { apiUrl } from './index';
import { GetCashiersParams } from '@/types';

export function fetchCashiers(params: GetCashiersParams) {
  return axios.post(`${apiUrl}/cashier/get-cashiers`, params);
}

export function addCashier(username: string, password: string) {
    return axios.post(`${apiUrl}/cashier/add-cashiers`, {username, password});
  }
  