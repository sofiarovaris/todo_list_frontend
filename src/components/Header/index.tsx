import { Box, Flex, Text, Icon, Button } from '@chakra-ui/react';
import { FaCheckCircle, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import TButton from '../TButton';
import useAuth from '../../hooks/useAuth';

export default function Header() {
  const { logout, user } = useAuth();
  return (
    <Box bg="#e5e7eb" p={{ base: 2, md: 4 }} h="100%">
      <Flex justify="space-between" h="100%">
        {/* Page Title Section */}
        <Flex align="center" h="100%">
          <Icon
            as={FaCheckCircle}
            w={{ base: 5, md: 6 }}
            h={{ base: 5, md: 6 }}
            color="#319795"
          />
          <Text
            ml={2}
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="bold"
            color="#2D3748"
          >
            ToDo List
          </Text>
        </Flex>

        <Flex align="center" mb={{ base: 2, md: 0 }} height="100%">
          <Icon
            as={FaUserAlt}
            w={{ base: 4, md: 5 }}
            h={{ base: 4, md: 5 }}
            color="#4b5563"
          />
          <Text ml={2} fontSize={{ base: 'sm', md: 'md' }} color="#4b5563">
            {user?.name ?? ''}
          </Text>
          <TButton
            ml={4}
            colorScheme="teal"
            variant="outline"
            width={{ base: '50px', md: '100px' }}
            height={{ base: '30px', md: '40px' }}
            leftIcon={<FaSignOutAlt />}
            onClick={logout}
            text="Logout"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
