import axios from 'axios';
import { apiUrl } from './index';

export function PaymentAPI(
    payload: any
) {
  return axios.post(`${apiUrl}/transaction/payment`, payload);
}
