import { CreateEditListProps } from '../types/list';
import api from './config';

export async function createList(userId: number, data: CreateEditListProps) {
  try {
    await api.post(`/lists/${userId}`, data);
  } catch (err) {
    console.error('Error creating list:', err);
    throw err;
  }
}

export async function updateList(id: number, data: CreateEditListProps) {
  try {
    await api.put(`/lists/${id}`, data);
  } catch (err) {
    console.error('Error updating list:', err);
    throw err;
  }
}

export async function deleteList(id: number) {
  try {
    await api.delete(`/lists/${id}`);
  } catch (err) {
    console.error('Error deleting list:', err);
    throw err;
  }
}
