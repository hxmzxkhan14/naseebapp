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
  // The Register route will now likely be a navigator for the multi-step flow
  RegisterFlow: undefined; // This will navigate to the first step of registration
  Home: undefined;
};

// Specific screens within the registration flow
export type RegistrationStackParamList = {
  CollectName: undefined;
  CollectPhoneNumber: undefined;
  CollectBirthday: undefined;
  CreateAccount: undefined; // This will be the final email/password screen
  // Add other steps here if needed
};
  