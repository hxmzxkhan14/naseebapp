import { User, LoginForm, RegisterForm } from '@/types';
import { appStorage } from '@/utils/storage';

// Mock user data for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AuthService {
  // Mock login
  static async login(credentials: LoginForm): Promise<{ user: User; token: string }> {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user || credentials.password !== 'password') {
      throw new Error('Invalid email or password');
    }
    
    const token = 'mock-jwt-token-' + Date.now();
    
    // Store user data and token
    await appStorage.setUserData(user);
    await appStorage.setUserToken(token);
    
    return { user, token };
  }

  // Mock register
  static async register(userData: RegisterForm): Promise<{ user: User; token: string }> {
    await delay(1000); // Simulate network delay
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      name: userData.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    const token = 'mock-jwt-token-' + Date.now();
    
    // Store user data and token
    await appStorage.setUserData(newUser);
    await appStorage.setUserToken(token);
    
    return { user: newUser, token };
  }

  // Mock logout
  static async logout(): Promise<void> {
    await delay(500); // Simulate network delay
    
    // Clear stored data
    await appStorage.removeUserToken();
    await appStorage.removeUserData();
  }

  // Mock get current user
  static async getCurrentUser(): Promise<User | null> {
    await delay(300); // Simulate network delay
    
    const token = await appStorage.getUserToken();
    if (!token) {
      return null;
    }
    
    const userData = await appStorage.getUserData();
    return userData;
  }

  // Mock check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    const token = await appStorage.getUserToken();
    return !!token;
  }

  // Mock update profile
  static async updateProfile(updates: Partial<User>): Promise<User> {
    await delay(1000); // Simulate network delay
    
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    const updatedUser: User = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    // Update in mock data
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }
    
    // Update stored data
    await appStorage.setUserData(updatedUser);
    
    return updatedUser;
  }
} 