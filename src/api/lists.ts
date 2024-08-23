import { CreateEditListProps } from '../types/list';
import api from './config';

export async function createList(data: CreateEditListProps): Promise<boolean> {
  try {
    await api.post('/lists/1', data);
    return true;
  } catch (err) {
    console.error('Error creating list:', err);
    return false;
  }
}

export async function updateList(id: number, data: CreateEditListProps) {
  try {
    await api.put(`/lists/${id}`, data);
    return true;
  } catch (err) {
    console.error('Error updating list:', err);
    return false;
  }
}

export async function deleteList(id: number) {
  try {
    await api.delete(`/lists/${id}`);
    return true;
  } catch (err) {
    console.error('Error deleting list:', err);
    return false;
  }
}
