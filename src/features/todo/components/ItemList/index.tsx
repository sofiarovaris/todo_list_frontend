import {
  Flex,
  Text,
  Checkbox,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  markListItemAsDone,
  markListItemAsUndone,
  deleteListItem,
  updateListItem,
} from '../../../../api/list_item';
import { ListItemProps } from '../../../../types/list';
import useListFetch from '../../hooks/useListFetch';
import { CloseIcon } from '@chakra-ui/icons';

interface ExtendedListItemProps extends ListItemProps {
  preview?: boolean;
  onDeleted?: () => void;
}

export default function ListItem({
  id,
  name,
  is_done,
  preview = false,
}: ExtendedListItemProps) {
  const [item, setItem] = useState<ListItemProps>({ id, name, is_done });
  const [isEditing, setIsEditing] = useState(false);
  const { mutate } = useListFetch();
  const toast = useToast();

  useEffect(() => {
    setItem({ id, name, is_done });
  }, [id, name, is_done]);

  async function handleToggle() {
    if (item.is_done) {
      const unchecked = await markListItemAsUndone(item.id);
      if (unchecked) {
        setItem((prevItem) => ({ ...prevItem, is_done: false }));
        mutate();
      }
    } else {
      const checked = await markListItemAsDone(item.id);
      if (checked) {
        setItem((prevItem) => ({ ...prevItem, is_done: true }));
        mutate();
      }
    }
  }

  async function handleDelete() {
    const deleted = await deleteListItem(item.id);
    if (deleted) {
      mutate();
      toast({
        title: 'Item deleted.',
        description: 'Your item has been deleted successfully.',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  function handleEditToggle() {
    setIsEditing(!isEditing);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItem((prevItem) => ({ ...prevItem, name: e.target.value }));
  }

  async function handleEditBlur() {
    setIsEditing(false);
    const edited = await updateListItem(item.id, { name: item.name });
    if (edited) {
      mutate();
      toast({
        title: 'Item updated.',
        description: 'Your item has been updated successfully.',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setIsEditing(false);
      await updateListItem(item.id, { name: item.name });
      mutate();
    }
  }

  return (
    <Flex align="center" mb={2} h="25px">
      <Checkbox
        isChecked={item.is_done}
        onChange={handleToggle}
        mr={2}
        size="md"
      />
      {isEditing ? (
        !preview && (
          <Input
            value={item.name}
            onChange={handleEditChange}
            onBlur={handleEditBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            border="none"
            borderBottom="1px solid"
            borderColor="#CBD5E0"
            p={0}
            pr={2}
            borderRadius={0}
            _focus={{
              boxShadow: 'none',
              border: 'none',
              borderBottom: '2px solid #E0E0E0',
            }}
          />
        )
      ) : (
        <Text
          flex="1"
          fontSize="md"
          fontWeight="medium"
          color={item.is_done ? '#718096' : '#1A202C'}
          textDecoration={item.is_done ? 'line-through' : 'none'}
          onClick={!preview ? handleEditToggle : undefined}
          cursor={!preview ? 'pointer' : 'default'}
          display="flex"
          alignItems="center"
          h="100%"
        >
          {item.name}
        </Text>
      )}
      {!preview && (
        <IconButton
          icon={<CloseIcon w={2.5} h={2.5} />}
          aria-label="Delete item"
          color="gray.500"
          variant="ghost"
          size="sm"
          ml={2}
          onClick={handleDelete}
        />
      )}
    </Flex>
  );
}
