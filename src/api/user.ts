import { LoginProps } from '../types/user';
import api from './config';

export async function signIn(data: LoginProps) {
  try {
    const token = await api.post(`/auth/login`, data);
    return token.data;
  } catch (err) {
    console.error('Error creating list:', err);
    return null;
  }
}

export async function getUser() {
  try {
    const user = await api.get(`/users/me`);
    return user.data;
  } catch (err) {
    console.error('Error getting user:', err);
    return null;
  }
}
