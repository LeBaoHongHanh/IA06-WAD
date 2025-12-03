import { Box, Container } from '@chakra-ui/react';
import { AppRouter } from './router';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Container maxW="lg" py={8}>
        <AppRouter />
      </Container>
    </Box>
  );
}

export default App;
