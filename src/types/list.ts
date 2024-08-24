export interface ListItemProps {
  id: number;
  name: string;
  is_done: boolean;
}

export interface ListProps {
  id: number;
  name: string;
  color: string;
  items: ListItemProps[];
}

export interface CreateEditListProps {
  name: string;
  color: string;
}

export interface CreateEditListItemProps {
  name: string;
}
