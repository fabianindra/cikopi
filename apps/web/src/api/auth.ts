import axios from 'axios';
import { apiUrl } from './index';

export function Login(username: string, password: string) {
  return axios.post(`${apiUrl}/auth/user-login`, { username, password });
}
