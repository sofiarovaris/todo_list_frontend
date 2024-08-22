import { Flex, Text, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';

interface ListItemProps {
  text: string;
  isChecked: boolean;
}

export default function ListItem({ text, isChecked }: ListItemProps) {
  const [checked, setChecked] = useState(isChecked);

  function handleToggle() {
    setChecked(!checked);
  }

  return (
    <Flex align="center" mb={2}>
      <Checkbox isChecked={checked} onChange={handleToggle} mr={2} size="md" />
      <Text
        flex="1"
        fontSize="md"
        fontWeight="medium"
        color={checked ? '#718096' : '#1A202C'}
        textDecoration={checked ? 'line-through' : 'none'}
      >
        {text}
      </Text>
    </Flex>
  );
}
