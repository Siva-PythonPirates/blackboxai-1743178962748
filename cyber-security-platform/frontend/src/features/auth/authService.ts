import api from '../../api/axios';
import { LoginCredentials, RegisterData, AuthResponse } from './authTypes';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const refreshToken = async (token: string): Promise<{ token: string }> => {
  try {
    const response = await api.post('/auth/refresh', { refreshToken: token });
    return response.data;
  } catch (error: any) {
    throw new Error('Session expired. Please login again.');
  }
};

export const getCurrentUser = async (): Promise<AuthResponse['user']> => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error: any) {
    throw new Error('Failed to fetch user data');
  }
};
