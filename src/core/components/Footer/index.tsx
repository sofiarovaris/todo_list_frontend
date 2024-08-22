import { Box, Flex, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="#e5e7eb" minHeight="60px" h="100%">
      <Flex justify="center" align="center" h="100%">
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="#4b5563">
          &copy; {new Date().getFullYear()} Todo List - All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
}
