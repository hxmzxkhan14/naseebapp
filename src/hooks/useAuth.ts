import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth';
import { LoginForm, RegisterForm, User } from '@/types';
import { router } from 'expo-router';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: AuthService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check authentication status
  const { data: isAuthenticated } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: AuthService.isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['isAuthenticated'], true);
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['isAuthenticated'], true);
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.setQueryData(['isAuthenticated'], false);
      queryClient.clear();
      router.replace('/(auth)/login');
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: AuthService.updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
    },
    onError: (error) => {
      console.error('Update profile error:', error);
    },
  });

  // Login function
  const login = async (credentials: LoginForm) => {
    try {
      await loginMutation.mutateAsync(credentials);
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (userData: RegisterForm) => {
    try {
      await registerMutation.mutateAsync(userData);
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (updates: Partial<User>) => {
    try {
      await updateProfileMutation.mutateAsync(updates);
    } catch (error) {
      throw error;
    }
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoadingUser,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    updateProfileError: updateProfileMutation.error,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
  };
}; 