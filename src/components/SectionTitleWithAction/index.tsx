import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { MdPlaylistAdd } from 'react-icons/md'; // Importa o ícone
import TButton from '../TButton';
import EditListModal from '../../features/todo/components/EditListModal';
import { createList } from '../../api/lists';
import useListFetch from '../../features/todo/hooks/useListFetch';
import { useToast } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';

export default function SectionTitleWithAction() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate } = useListFetch();
  const toast = useToast();
  const { user } = useAuth();

  async function handleSave(data: any) {
    if (!user) {
      return;
    }
    const created = await createList(user.id, data);
    if (created) {
      onClose();
      mutate();
      toast({
        title: 'List created.',
        description: 'Your new list has been created successfully.',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error creating list.',
        description: 'An error occurred while creating your list.',
        status: 'error',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  return (
    <Box p={{ base: 2, md: 4 }}>
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold" color="#1A202C">
          Your Lists
        </Text>

        <TButton
          colorScheme="teal"
          variant="solid"
          leftIcon={<MdPlaylistAdd size="24px" />}
          text="New List"
          w={{ base: '50px', md: '150px' }}
          h={{ base: '30px', md: '40px' }}
          onClick={onOpen}
        />
      </Flex>

      <EditListModal isOpen={isOpen} onClose={onClose} onSave={handleSave} />
    </Box>
  );
}
