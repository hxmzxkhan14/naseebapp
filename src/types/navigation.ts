// src/types/navigation.ts

// Data collected across registration steps
export interface RegistrationData {
  name?: string;
  phoneNumber?: string;
  birthday?: string; // Consider using a Date object or a string in ISO format
  email?: string;
  password?: string;
}

export type AuthStackParamList = {
  Login: undefined;
  RegisterFlow: { screen?: keyof RegistrationStackParamList; params?: any } | undefined; // Updated to allow screen and params
  Home: { screen?: keyof LoggedInScreen; params?: any } | undefined;
};

// Specific screens within the registration flow
export type RegistrationStackParamList = {
  CollectName: undefined;
  CollectPhoneNumber: undefined; // Could accept a pre-filled phone number from another flow
  CollectBirthday: undefined;
  CreateAccount: undefined; // This will be the final email/password screen
  // Add other steps here if needed
};

export type LoggedInScreen = {
  Home: undefined;
  Messages: undefined;
  Activity: undefined;
  Profile: undefined;
}; 