import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  register: any;
  error?: FieldError;
  placeholder?: string;
}

export function InputField({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
}: InputFieldProps) {
  return (
    <FormControl isInvalid={!!error} mb={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} type={type} placeholder={placeholder} {...register} />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
