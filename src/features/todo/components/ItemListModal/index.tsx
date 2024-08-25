import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  useToast,
} from '@chakra-ui/react';
import ListItem from '../ItemList';
import AddItem from '../AddItem';
import { useState } from 'react';
import { ListItemProps } from '../../../../types/list';
import useListFetch from '../../hooks/useListFetch';
import { createListItem } from '../../../../api/list_item';

interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  id: number;
  items: ListItemProps[];
  color: string; // Adicione a propriedade color
}

export default function ItemListModal({
  isOpen,
  onClose,
  title,
  id,
  items,
  color,
}: ListModalProps) {
  const [newItemText, setNewItemText] = useState('');
  const { mutate } = useListFetch();
  const toast = useToast();

  async function handleAddItem() {
    if (newItemText.trim()) {
      const created = await createListItem(id, {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent mx={{ base: 4, md: 8 }} p={0}>
        {/* Box for header background color */}
        <Box bg={color} borderTopRadius="md" p={5}>
          <ModalHeader p={0}>{title}</ModalHeader>
          <ModalCloseButton />
        </Box>
        <ModalBody p={5} mb="5px">
          <Box maxH="60vh" overflowY="auto">
            {items.map((item, index) => (
              <ListItem key={index} {...item} />
            ))}
          </Box>
          <AddItem
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onAdd={handleAddItem}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
