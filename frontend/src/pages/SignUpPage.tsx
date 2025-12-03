import { Box, Heading, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/form/InputField';
import { SubmitButton } from '../components/form/SubmitButton';
import { useRegisterUser } from '../hooks/useRegisterUser';
import { useToastMessage } from '../hooks/useToastMessage';
import { isValidEmail } from '../lib/validation';

interface SignUpFormValues {
  email: string;
  password: string;
}

export function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useRegisterUser();
  const { showSuccess, showError } = useToastMessage();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await mutateAsync({
        email: values.email,
        password: values.password,
      });
      showSuccess('Registration successful', 'Redirecting to login page...');
      reset();
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to register. Please try again.';
      showError('Registration failed', message);
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
      <Heading size="lg" mb={4}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={0} align="stretch">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register('email', {
              required: 'Email is required',
              validate: (value) => isValidEmail(value) || 'Please enter a valid email address',
            })}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            register={register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password}
          />
          <SubmitButton isLoading={isPending}>Create account</SubmitButton>
        </VStack>
      </form>
    </Box>
  );
}
