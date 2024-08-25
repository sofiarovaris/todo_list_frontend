import api from '../api/config';
import { LoginProps } from '../types/user';

export async function signIn(data: LoginProps) {
  try {
    const response = await api.post(`/auth/login`, data);
    return response.data;
  } catch (err) {
    console.error('Error signing in:', err);
    throw err;
  }
}

export async function getUser() {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (err) {
    console.error('Error getting user:', err);
    throw err;
  }
}
