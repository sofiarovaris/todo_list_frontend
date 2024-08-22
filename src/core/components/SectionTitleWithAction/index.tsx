import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { MdPlaylistAdd } from 'react-icons/md'; // Importa o ícone
import TButton from '../TButton';
import EditListModal from '../../../features/list/components/List/EditListModal';

export default function SectionTitleWithAction() {
  const { isOpen, onClose, onOpen } = useDisclosure();

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

      <EditListModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={() => {
          // Future implementation
        }}
      />
    </Box>
  );
}
