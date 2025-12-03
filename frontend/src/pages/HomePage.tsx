import { Box, Heading, Text, List, ListItem, ListIcon, Button, HStack, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn && user) {
    // Logged in view
    return (
      <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading size="lg" mb={2}>
              Welcome, {user.email}! 👋
            </Heading>
            <Text color="gray.600">
              You are successfully logged in. You can now explore the application.
            </Text>
          </Box>

          <Box borderTop="1px" borderColor="gray.200" pt={4}>
            <Heading size="md" mb={3}>
              Your Account Info
            </Heading>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Email:</strong> {user.email}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Status:</strong> <span style={{ color: '#48bb78' }}>Active</span>
              </ListItem>
            </List>
          </Box>

          <Box borderTop="1px" borderColor="gray.200" pt={4}>
            <Text color="gray.600" mb={3}>
              You are logged in. Check the Sign Up page to register new accounts or navigate to
              other pages.
            </Text>
            <HStack spacing={3}>
              <Button
                as={RouterLink}
                to="/signup"
                colorScheme="teal"
                variant="outline"
                size="sm"
              >
                Go to Sign Up
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                colorScheme="teal"
                variant="ghost"
                size="sm"
              >
                Back to Login
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    );
  }

  // Not logged in view
  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
      <VStack align="stretch" spacing={4}>
        <Box>
          <Heading size="lg" mb={2}>
            Welcome to IA06 - User Registration API with React Frontend 👋
          </Heading>
          <Text color="gray.600">
            This is a complete user registration and authentication demo system. Get started by
            signing up or logging in.
          </Text>
        </Box>

        <Box borderTop="1px" borderColor="gray.200" pt={4}>
          <Heading size="md" mb={3}>
            Features
          </Heading>
          <List spacing={2}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <strong>Secure Registration:</strong> Create a new account with email and password
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <strong>User Authentication:</strong> Log in with your registered credentials
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <strong>Real Backend:</strong> NestJS API validates and stores your account
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <strong>Password Security:</strong> Passwords are hashed before storage
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <strong>User Data:</strong> View your account information after login
            </ListItem>
          </List>
        </Box>

        <Box borderTop="1px" borderColor="gray.200" pt={4}>
          <Heading size="md" mb={3}>
            Get Started
          </Heading>
          <HStack spacing={3}>
            <Button as={RouterLink} to="/signup" colorScheme="teal" size="md">
              Sign Up
            </Button>
            <Button as={RouterLink} to="/login" colorScheme="teal" variant="outline" size="md">
              Login
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
