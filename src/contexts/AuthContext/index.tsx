import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUser, signIn } from '../../api/user';
import { UserProps } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  user: UserProps | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  async function getUserData() {
    try {
      const userData = await getUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserData();
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  async function login(data: { email: string; password: string }) {
    try {
      const response = await signIn(data);
      localStorage.setItem('token', response.accessToken);
      await getUserData();
      toast({
        title: 'Login efetuado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      toast({
        title: 'Erro ao efetuar login!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
