import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RegistrationData } from '@/src/types/navigation'; // This type might also be renamed or generalized if needed

interface UserSignupContextType {
  signupData: RegistrationData; // Renamed from registrationData
  updateSignupData: (data: Partial<RegistrationData>) => void; // Renamed from updateRegistrationData
  resetSignupData: () => void; // Renamed from resetRegistrationData
}

const UserSignupContext = createContext<UserSignupContextType | undefined>(undefined);

const initialData: RegistrationData = {
  name: '',
  phoneNumber: '',
  birthday: '',
  email: '',
  password: '',
};

export const UserSignupProvider = ({ children }: { children: ReactNode }) => { // Renamed from RegistrationProvider
  const [signupData, setSignupData] = useState<RegistrationData>(initialData); // Renamed from registrationData

  const updateSignupData = (data: Partial<RegistrationData>) => { // Renamed from updateRegistrationData
    setSignupData((prevData) => ({ ...prevData, ...data }));
  };

  const resetSignupData = () => { // Renamed from resetRegistrationData
    setSignupData(initialData);
  };

  return (
    <UserSignupContext.Provider value={{ signupData, updateSignupData, resetSignupData }}>
      {children}
    </UserSignupContext.Provider>
  );
};

export const useUserSignup = () => { // Renamed from useRegistration
  const context = useContext(UserSignupContext);
  if (context === undefined) {
    throw new Error('useUserSignup must be used within a UserSignupProvider');
  }
  return context;
}; 