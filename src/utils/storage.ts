import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME_MODE: 'theme_mode',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;

// Generic storage functions
export const storage = {
  // Set item
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },

  // Get item
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  },

  // Remove item
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },

  // Clear all data
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },
};

// Specific storage functions for app data
export const appStorage = {
  // User token
  async setUserToken(token: string): Promise<void> {
    await storage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  },

  async getUserToken(): Promise<string | null> {
    return await storage.getItem<string>(STORAGE_KEYS.USER_TOKEN);
  },

  async removeUserToken(): Promise<void> {
    await storage.removeItem(STORAGE_KEYS.USER_TOKEN);
  },

  // User data
  async setUserData(userData: any): Promise<void> {
    await storage.setItem(STORAGE_KEYS.USER_DATA, userData);
  },

  async getUserData(): Promise<any | null> {
    return await storage.getItem(STORAGE_KEYS.USER_DATA);
  },

  async removeUserData(): Promise<void> {
    await storage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // Theme mode
  async setThemeMode(mode: 'light' | 'dark'): Promise<void> {
    await storage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  },

  async getThemeMode(): Promise<'light' | 'dark' | null> {
    return await storage.getItem<'light' | 'dark'>(STORAGE_KEYS.THEME_MODE);
  },

  // Onboarding
  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  },

  async getOnboardingCompleted(): Promise<boolean | null> {
    return await storage.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
  },
}; 