import { CreateEditListItemProps, CreateEditListProps } from '../types/list';
import api from './config';

export async function createListItem(
  listId: number,
  data: CreateEditListItemProps
): Promise<boolean> {
  try {
    await api.post(`/list_items/${listId}`, data);
    return true;
  } catch (err) {
    console.error('Error creating list:', err);
    return false;
  }
}

export async function updateListItem(
  id: number,
  data: CreateEditListItemProps
) {
  try {
    await api.put(`/list_items/${id}`, data);
    return true;
  } catch (err) {
    console.error('Error updating list:', err);
    return false;
  }
}

export async function deleteListItem(id: number) {
  try {
    await api.delete(`/list_items/${id}`);
    return true;
  } catch (err) {
    console.error('Error deleting list:', err);
    return false;
  }
}

export async function markListItemAsDone(id: number) {
  try {
    await api.put(`/list_items/${id}/done`);
    return true;
  } catch (err) {
    console.error('Error marking list item as done:', err);
    return false;
  }
}

export async function markListItemAsUndone(id: number) {
  try {
    await api.put(`/list_items/${id}/undone`);
    return true;
  } catch (err) {
    console.error('Error marking list item as undone:', err);
    return false;
  }
}
