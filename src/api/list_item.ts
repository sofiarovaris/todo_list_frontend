import { CreateEditListItemProps } from '../types/list';
import api from './config';

export async function createListItem(
  listId: number,
  data: CreateEditListItemProps
) {
  try {
    await api.post(`/list_items/${listId}`, data);
  } catch (err) {
    console.error('Error creating list:', err);
    throw err;
  }
}

export async function updateListItem(
  id: number,
  data: CreateEditListItemProps
) {
  try {
    await api.put(`/list_items/${id}`, data);
  } catch (err) {
    console.error('Error updating list:', err);
    throw err;
  }
}

export async function deleteListItem(id: number) {
  try {
    await api.delete(`/list_items/${id}`);
  } catch (err) {
    console.error('Error deleting list:', err);
    throw err;
  }
}

export async function markListItemAsDone(id: number) {
  try {
    await api.put(`/list_items/${id}/done`);
  } catch (err) {
    console.error('Error marking list item as done:', err);
    throw err;
  }
}

export async function markListItemAsUndone(id: number) {
  try {
    await api.put(`/list_items/${id}/undone`);
  } catch (err) {
    console.error('Error marking list item as undone:', err);
  }
}
