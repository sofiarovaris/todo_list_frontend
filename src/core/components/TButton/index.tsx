import { Button, ButtonProps, Box, Icon, IconProps } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface TButtonProps extends ButtonProps {
  variant?: 'outline' | 'solid';
  colorScheme?: 'teal' | 'blue' | 'green';
  leftIcon?: ReactElement<IconProps>;
  rightIcon?: ReactElement<IconProps>;
  hideTextOnMobile?: boolean;
  text: string;
}

export default function TButton({
  variant = 'solid',
  colorScheme = 'teal',
  leftIcon,
  rightIcon,
  text,
  ...props
}: TButtonProps) {
  return (
    <Button
      variant={variant}
      colorScheme={colorScheme}
      width="100px"
      height="30px"
      size="sm"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {leftIcon && <Box display="inline">{leftIcon}</Box>}
      {rightIcon && <Box display="inline">{rightIcon}</Box>}
      <Box display={{ base: 'none', md: 'inline' }} textAlign="center" flex="1">
        {text}
      </Box>
    </Button>
  );
}
