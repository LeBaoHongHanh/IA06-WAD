import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SubmitButtonProps {
  isLoading?: boolean;
  children: ReactNode;
}

export function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      colorScheme="teal"
      width="full"
      isLoading={isLoading}
      loadingText="Processing"
      mt={2}
    >
      {children}
    </Button>
  );
}
