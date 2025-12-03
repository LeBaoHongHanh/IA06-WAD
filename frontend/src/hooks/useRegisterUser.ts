import { useMutation } from '@tanstack/react-query';
import { RegisterPayload, registerUser } from '../api/userApi';

export function useRegisterUser() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}
