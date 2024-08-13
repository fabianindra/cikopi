import axios from 'axios';
import { apiUrl } from './index';

export function CheckIn( cashAmount: string, userId: number ) {
  return axios.post(`${apiUrl}/shift/checkin`, { cashAmount, userId });
}
