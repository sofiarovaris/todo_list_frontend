import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from '@chakra-ui/react';
import ListItem from '../ItemList';
import AddItem from '../AddItem';
import { useState } from 'react';

interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: {
    text: string;
    isChecked: boolean;
  }[];
}

export default function ItemListModal({
  isOpen,
  onClose,
  title,
  items,
}: ListModalProps) {
  const [newItemText, setNewItemText] = useState('');

  function handleAddItem() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent mx={{ base: 4, md: 8 }} p={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box maxH="60vh" overflowY="auto">
            {items.map((item, index) => (
              <ListItem
                key={index}
                text={item.text}
                isChecked={item.isChecked}
              />
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
