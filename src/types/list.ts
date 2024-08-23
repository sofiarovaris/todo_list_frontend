export interface ListItemProps {
  id: number;
  name: string;
  isDone: boolean;
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
