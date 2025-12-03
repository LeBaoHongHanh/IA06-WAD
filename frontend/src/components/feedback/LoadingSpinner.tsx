import { Center, Spinner } from '@chakra-ui/react';

export function LoadingSpinner() {
  return (
    <Center py={10}>
      <Spinner size="lg" />
    </Center>
  );
}
