import { Flex, Input, IconButton } from '@chakra-ui/react';
import { on } from 'events';
import { FaPlus } from 'react-icons/fa';

interface AddItemProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

export default function AddItem({ value, onChange, onAdd }: AddItemProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onAdd();
    }
  }
  return (
    <Flex align="center" mt={2}>
      <Input
        placeholder="Add new item"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        border="none"
        borderBottom="1px solid"
        borderColor="#CBD5E0"
        p={0}
        pr={2}
        borderRadius={0}
        _focus={{
          boxShadow: 'none',
          border: 'none',
          borderBottom: '2px solid #E0E0E0',
        }}
      />
      <IconButton
        icon={<FaPlus />}
        aria-label="Add new item..."
        colorScheme="teal"
        onClick={onAdd}
        size="sm"
      />
    </Flex>
  );
}
