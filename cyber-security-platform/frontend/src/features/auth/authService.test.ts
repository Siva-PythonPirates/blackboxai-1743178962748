import { login, register } from './authService';
import axios from '../../api/axios';
import { LoginCredentials, RegisterData } from './authTypes';

jest.mock('../../api/axios');

describe('authService', () => {
  const mockLoginCredentials: LoginCredentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  const mockRegisterData: RegisterData = {
    ...mockLoginCredentials,
    firstName: 'Test',
    lastName: 'User'
  };

  const mockResponse = {
    data: {
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      },
      token: 'test-token',
      refreshToken: 'test-refresh-token'
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return user data on successful login', async () => {
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);
      const result = await login(mockLoginCredentials);
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error on failed login', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Login failed'));
      await expect(login(mockLoginCredentials)).rejects.toThrow('Login failed');
    });
  });

  describe('register', () => {
    it('should return user data on successful registration', async () => {
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);
      const result = await register(mockRegisterData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error on failed registration', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Registration failed'));
      await expect(register(mockRegisterData)).rejects.toThrow('Registration failed');
    });
  });
});