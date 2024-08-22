import {
  Box,
  Flex,
  Text,
  IconButton,
  Divider,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import AddItem from './AddItem';
import ListItem from './ItemList';
import ItemListModal from './ItemListModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditListModal from './EditListModal';

interface ListItemProps {
  text: string;
  isChecked: boolean;
}

interface ListComponentProps {
  title: string;
  items: ListItemProps[];
  onAddItem: (itemText: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ListComponent({
  title,
  items,
  onAddItem,
  onEdit,
  onDelete,
}: ListComponentProps) {
  const [newItemText, setNewItemText] = useState('');

  const listModal = useDisclosure();
  const deleteModal = useDisclosure();

  const editModal = useDisclosure();

  function handleAddItem() {
    if (newItemText.trim()) {
      onAddItem(newItemText);
      setNewItemText('');
    }
  }

  function handleDeleteConfirm() {
    onDelete();
  }

  function handleSave(name: string, color: string) {}

  const completedCount = items.filter((item) => item.isChecked).length;
  const totalCount = items.length;
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
          {title}
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
        {items.slice(0, 3).map((item, index) => (
          <ListItem key={index} text={item.text} isChecked={item.isChecked} />
        ))}
        {items.length > 3 && (
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
        title={title}
        items={items}
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
        list={{ name: title, color: '#000000' }}
      />
    </Box>
  );
}
