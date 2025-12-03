import { Box, Flex, Heading, Spacer, Button, HStack, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box bg="white" boxShadow="sm" px={6} py={3}>
      <Flex align="center">
        <Heading as={RouterLink} to="/" size="md">
          IA06 User Registration
        </Heading>
        <Spacer />
        <HStack spacing={3}>
          {!isLoggedIn ? (
            <>
              <Button
                as={RouterLink}
                to="/login"
                variant={isActive('/login') ? 'solid' : 'ghost'}
                colorScheme="teal"
                size="sm"
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/signup"
                variant={isActive('/signup') ? 'solid' : 'outline'}
                colorScheme="teal"
                size="sm"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="ghost"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar size="sm" name={user?.email} />
                </MenuButton>
                <MenuList>
                  <MenuItem disabled>
                    <Box>
                      <Box fontSize="sm" fontWeight="bold">
                        {user?.email}
                      </Box>
                      <Box fontSize="xs" color="gray.500">
                        Logged in
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/signup">
                    Sign Up New Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout} color="red.500">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
