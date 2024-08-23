import {
  Box,
  Flex,
  Text,
  IconButton,
  Divider,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { ListItemProps, ListProps } from '../../../../types/list';
import ListItem from '../ItemList';
import AddItem from '../AddItem';
import ItemListModal from '../ItemListModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import EditListModal from '../EditListModal';
import { deleteList, updateList } from '../../../../api/lists';
import useListFetch from '../../hooks/useListFetch';

interface ListComponentProps {
  list: ListProps;
}

export default function ListComponent({ list }: ListComponentProps) {
  const [newItemText, setNewItemText] = useState('');

  const listModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();

  const toast = useToast();

  const { mutate } = useListFetch();

  function handleAddItem() {
    if (newItemText.trim()) {
      // onAddItem(newItemText);
      setNewItemText('');
    }
  }

  async function handleDeleteConfirm() {
    const deleted = await deleteList(list.id);

    if (deleted) {
      deleteModal.onClose();
      mutate();
      toast({
        title: 'List deleted.',
        description: 'Your list has been deleted successfully.',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error deleting list.',
        description: 'An error occurred while deleting your list.',
        status: 'error',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  async function handleSave(data: any) {
    const updated = await updateList(list.id, data);
    if (updated) {
      editModal.onClose();
      mutate();
      toast({
        title: 'List updated.',
        description: 'Your list has been updated successfully.',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error updating list.',
        description: 'An error occurred while updating your list.',
        status: 'error',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  const completedCount = list.items.filter((item) => item.isDone).length;
  const totalCount = list.items.length;
  const completionPercentage = totalCount
    ? (completedCount / totalCount) * 100
    : 0;

  return (
    <Box
      border="1px"
      borderColor="#CBD5E0"
      borderRadius="md"
      overflow="hidden"
      p={4}
      mb={4}
      display="flex"
      flexDirection="column"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="lg" fontWeight="bold" color="#1A202C">
          {list.name}
        </Text>
        <Flex>
          <IconButton
            icon={<FaEdit />}
            aria-label="Edit list"
            size="sm"
            colorScheme="teal"
            mr={2}
            onClick={editModal.onOpen}
          />
          <IconButton
            icon={<FaTrash />}
            aria-label="Delete list"
            size="sm"
            colorScheme="red"
            onClick={deleteModal.onOpen}
          />
        </Flex>
      </Flex>
      <Divider mb={2} />
      <Box flex="1" maxH="200px" overflowY="auto" mb={2}>
        {list.items.slice(0, 3).map((item, index) => (
          <ListItem key={index} text={item.name} isChecked={item.isDone} />
        ))}
        {list.items.length > 3 && (
          <Button
            mt={2}
            variant="link"
            colorScheme="teal"
            onClick={listModal.onOpen}
          >
            See all items
          </Button>
        )}
      </Box>
      <AddItem
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        onAdd={handleAddItem}
      />
      <Flex justify="flex-end" align="center" mt={3} pt={2}>
        <Text fontSize="sm" color="#4b5563">
          Total: {totalCount} | Done: {completedCount} (
          {completionPercentage.toFixed(2)}%)
        </Text>
      </Flex>

      {/* Modal to show all items */}
      <ItemListModal
        isOpen={listModal.isOpen}
        onClose={listModal.onClose}
        title={list.name}
        items={list.items}
      />

      {/* Modal to confirm deletion */}
      <DeleteConfirmationModal
        title="Confirm deletion"
        text="Are you sure you want to delete this list? This action cannot be undone."
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirm={handleDeleteConfirm}
      />

      {/* Modal to edit list */}
      <EditListModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        onSave={handleSave}
        list={{ name: list.name, color: list.color }}
      />
    </Box>
  );
}
