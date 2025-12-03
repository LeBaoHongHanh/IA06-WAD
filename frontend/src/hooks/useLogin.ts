import { useState } from 'react';
import { loginUser, LoginPayload, LoginResponse, User } from '../api/userApi';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    setIsLoading(true);
    try {
      // Call real backend API
      const response = await loginUser(credentials);
      return {
        success: true,
        message: response.message,
        user: response.user,
      };
    } catch (error: any) {
      // Handle specific error messages from backend
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed. Please check your credentials and try again.';

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
