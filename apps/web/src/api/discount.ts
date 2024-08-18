import axios from 'axios';
import { apiUrl } from './index';

export function addDiscount(startDate: string, endDate: string, discountAmount: string) {
    return axios.post(`${apiUrl}/discount/add-discount`, {startDate, endDate, discountAmount});
  }

export function getDiscount(date: string) {
    return axios.get(`${apiUrl}/discount/get-discount`, {
      params: {
        date
      }
    });
  }

export function getAllDiscount() {
    return axios.get(`${apiUrl}/discount/get-all-discount`)
  }