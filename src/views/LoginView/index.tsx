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
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginView() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Input
              placeholder="E-mail"
              type="email"
              {...register('email', { required: 'Email is required' })}
              borderColor="#CBD5E0"
              _hover={{ borderColor: '#A0AEC0' }}
              _focus={{ borderColor: '#63B3ED' }}
            />
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message}
              </Text>
            )}
            <Input
              placeholder="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              borderColor="#CBD5E0"
              _hover={{ borderColor: '#A0AEC0' }}
              _focus={{ borderColor: '#63B3ED' }}
            />
            {errors.password && (
              <Text color="red.500" fontSize="sm">
                {errors.password.message}
              </Text>
            )}
          </Stack>
          <Button
            type="submit"
            bg="#319795"
            color="white"
            _hover={{ bg: '#2B6CB0' }}
            size="lg"
            mt={6}
          >
            Sign in
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
