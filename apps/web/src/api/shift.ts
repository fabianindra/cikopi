import axios from 'axios';
import { apiUrl } from './index';
import { CheckInResponse } from '@/types';

export const CheckIn = async (cashAmount: string, userId: number): Promise<CheckInResponse> => {
    try {
      const response = await axios.post(`${apiUrl}/shift/checkin`, { cashAmount, userId });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export function CheckOut( cashAmount: string, userId: number, shiftId: number ) {
    return axios.post(`${apiUrl}/shift/checkout`, { cashAmount, userId, shiftId });
  }
  