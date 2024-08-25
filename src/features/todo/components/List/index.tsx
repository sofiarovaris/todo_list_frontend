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
import { createListItem } from '../../../../api/list_item';

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

  async function handleAddItem() {
    if (newItemText.trim()) {
      const created = await createListItem(list.id, {
        name: newItemText,
      });

      try {
        mutate();
        setNewItemText('');
        toast({
          title: 'Item added.',
          description: 'Your item has been added successfully.',
          status: 'success',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'Error adding item.',
          description: 'An error occurred while adding your item.',
          status: 'error',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }

      setNewItemText('');
    }
  }

  async function handleDeleteConfirm() {
    try {
      await deleteList(list.id);
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
    } catch (err) {
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
    try {
      await updateList(list.id, data);
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
    } catch (err) {
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

  const completedCount = list.items.filter((item) => item.is_done).length;
  const totalCount = list.items.length;
  const completionPercentage = totalCount
    ? (completedCount / totalCount) * 100
    : 0;

  return (
    <Box
      border="1px"
      borderColor="#E2E8F0"
      borderRadius="md"
      overflow="hidden"
      mb={4}
      display="flex"
      flexDirection="column"
    >
      <Box backgroundColor={list.color} p={4} w="100%">
        <Flex justify="space-between" align="center" mb={2} w="100%" h="100%">
          <Text fontSize="lg" fontWeight="bold" color="#1A202C">
            {list.name}
          </Text>
          <Flex>
            <IconButton
              icon={<FaEdit />}
              aria-label="Edit list"
              size="sm"
              color="gray.600"
              mr={2}
              _hover={{ bg: 'gray.100' }}
              onClick={editModal.onOpen}
            />
            <IconButton
              icon={<FaTrash />}
              aria-label="Delete list"
              size="sm"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
              onClick={deleteModal.onOpen}
            />
          </Flex>
        </Flex>
      </Box>
      <Divider mb={2} />
      <Box
        flex="1"
        maxH="150px"
        minH="150px"
        mb={2}
        px={4}
        py={2}
        position="relative"
      >
        {list.items.length === 0 && (
          <Text
            fontSize="sm"
            color="#4A5568"
            position="absolute"
            top={2}
            zIndex={1}
          >
            No items in this list
          </Text>
        )}
        <Box h="100%" overflow="auto" pt={list.items.length === 0 ? 8 : 0}>
          {list.items.slice(0, 3).map((item, index) => (
            <ListItem key={index} {...item} preview />
          ))}
        </Box>
        {list.items.length > 0 && (
          <Button
            position="absolute"
            bottom={4}
            left={4}
            variant="link"
            colorScheme="teal"
            onClick={listModal.onOpen}
          >
            Open list
          </Button>
        )}
      </Box>
      <Box px={4} py={2} borderTop="1px solid #E2E8F0">
        <AddItem
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onAdd={handleAddItem}
        />
        <Flex justify="flex-end" align="center" mt={3} pt={2}>
          <Text fontSize="sm" color="#4A5568">
            Total: {totalCount} | Done: {completedCount} (
            {completionPercentage.toFixed(2)}%)
          </Text>
        </Flex>
      </Box>

      {/* Modal to show all items */}
      <ItemListModal
        isOpen={listModal.isOpen}
        onClose={listModal.onClose}
        title={list.name}
        id={list.id}
        items={list.items}
        color={list.color}
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
