import {
  Box,
  Flex,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

interface ListProps {
  name: string;
  color: string;
}

interface ListEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
  list?: ListProps;
}

export default function EditListModal({
  isOpen,
  onClose,
  onSave,
  list,
}: ListEditModalProps) {
  const [name, setName] = useState(list?.name || '');
  const [color, setColor] = useState(list?.color || '#000000');

  function handleSave() {}

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={{ base: 4, md: 8 }} p={4}>
        <ModalHeader>{list?.name ? 'Edit List' : 'Create List'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">List name</FormLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the list name"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="color">List color</FormLabel>
            <Flex align="center" direction="column">
              <HexColorPicker
                color={color}
                onChange={setColor}
                style={{ width: '100%' }}
              />
              <Flex w="100%" gap="10px" mt="10px">
                <Box
                  bg={color}
                  borderRadius="md"
                  boxSize="40px"
                  border="1px solid"
                  borderColor="#CBD5E0"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Enter the list color"
                  width="100%"
                />
              </Flex>
            </Flex>
          </FormControl>
          <Flex justify="flex-end">
            <Button colorScheme="teal" onClick={handleSave}>
              {list?.name ? 'Save' : 'Create'}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
