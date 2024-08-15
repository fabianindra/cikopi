import axios from 'axios';
import { apiUrl } from './index';

export function PaymentAPI(
    payload: any
) {
  return axios.post(`${apiUrl}/transaction/payment`, payload);
}

export function getTransactionByDate(date: string) {
    return axios.get(`${apiUrl}/transaction/get-by-date`, {
      params: { date }
    });
  }

  export function getTransactionDetails(transactionId: number) {
    return axios.get(`${apiUrl}/transaction/get-details`, {
      params: { transactionId: transactionId }
    });
  }

  export function getTransactionAdmin(
    startDate: string,
    endDate: string,
    category: string,
    sortBy: string = 'transaction_date',
    sortDirection: 'asc' | 'desc' = 'asc'
  ) {
    return axios.get(`${apiUrl}/transaction/get-admin`, {
      params: {
        startDate,
        endDate,
        category,
        sortBy,
        sortDirection,
      },
    });
  }

  export function getProductReport(date: string) {
    return axios.get(`${apiUrl}/transaction/get-by-product`, {
      params: { date: date }
    });
  }