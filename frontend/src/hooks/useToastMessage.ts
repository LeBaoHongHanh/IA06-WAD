import { useToast } from '@chakra-ui/react';

export function useToastMessage() {
  const toast = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top',
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  return { showSuccess, showError };
}
