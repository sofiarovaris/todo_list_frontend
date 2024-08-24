import {
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Text,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    toast({
      title: 'Login realizado com sucesso!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="#F7FAFC"
      p={4}
    >
      <Box
        p={8}
        maxW="md"
        w="full"
        bg="white"
        boxShadow="xl"
        borderRadius="lg"
        textAlign="center"
      >
        <Flex justifyContent="center" mb={6}>
          <Icon as={FaCheckCircle} w={8} h={8} color="#319795" />
          <Text ml={2} fontSize="2xl" fontWeight="bold" color="#2D3748">
            ToDo List
          </Text>
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" color="#2D3748" mb={6}>
          Login
        </Text>

        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="#CBD5E0"
              _hover={{ borderColor: '#A0AEC0' }}
              _focus={{ borderColor: '#63B3ED' }}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="#CBD5E0"
              _hover={{ borderColor: '#A0AEC0' }}
              _focus={{ borderColor: '#63B3ED' }}
            />
          </Stack>
          <Button
            type="submit"
            bg="#319795"
            color="white"
            _hover={{ bg: '#2B6CB0' }}
            size="lg"
            mt={6}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
