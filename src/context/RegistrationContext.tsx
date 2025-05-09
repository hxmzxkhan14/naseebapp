import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RegistrationData } from '@/src/types/navigation';

interface RegistrationContextType {
  registrationData: RegistrationData;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  resetRegistrationData: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const initialData: RegistrationData = {
  name: '',
  phoneNumber: '',
  birthday: '',
  email: '',
  password: '',
};

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(initialData);

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prevData) => ({ ...prevData, ...data }));
  };

  const resetRegistrationData = () => {
    setRegistrationData(initialData);
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData, resetRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}; 