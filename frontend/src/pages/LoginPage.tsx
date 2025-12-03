import {
  Box,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/form/InputField';
import { SubmitButton } from '../components/form/SubmitButton';
import { useLogin } from '../hooks/useLogin';
import { useToastMessage } from '../hooks/useToastMessage';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { login, isLoading } = useLogin();
  const { showSuccess, showError } = useToastMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await login(values);

      if (result.success && result.user) {
        // Save user to auth context
        authLogin(result.user);
        showSuccess('Login Successful', 'Welcome back!');
        reset();
        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        showError('Login Failed', result.message);
      }
    } catch (error) {
      showError('Error', 'An unexpected error occurred during login');
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
      <Heading size="lg" mb={4}>
        Login
      </Heading>
      <Alert status="info" mb={4}>
        <AlertIcon />
        <Box>
          <AlertTitle>Login to Your Account</AlertTitle>
          <AlertDescription>
            Enter the email and password you registered with.
          </AlertDescription>
        </Box>
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={0} align="stretch">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
            register={register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password}
          />
          <SubmitButton isLoading={isLoading}>Login</SubmitButton>
        </VStack>
      </form>
      <Text fontSize="sm" color="gray.500" mt={4}>
        You must have an existing account to log in. If you don't have one, please go to the Sign
        Up page.
      </Text>
    </Box>
  );
}
