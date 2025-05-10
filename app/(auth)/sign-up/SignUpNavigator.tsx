import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserSignupProvider } from '@/src/context/UserSignupContext';
import { RegistrationStackParamList } from '@/src/types/navigation'; // Assuming this type defines the screen names

// Import screen components using their restored original filenames
import CollectNameScreen from '@/app/(auth)/sign-up/CollectNameScreen'; 
import CollectPhoneNumberScreen from '@/app/(auth)/sign-up/CollectPhoneNumberScreen'; 
import CollectBirthdayScreen from '@/app/(auth)/sign-up/CollectBirthdayScreen'; 
import CreateAccountScreen from '@/app/(auth)/sign-up/CreateAccountScreen'; 

const Stack = createStackNavigator<RegistrationStackParamList>();

export default function SignUpNavigator() {
  console.log('[SignUpNavigator.tsx] Rendering SignUpNavigator with correct screen imports...');
  return (
    <UserSignupProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CollectName">
        <Stack.Screen name="CollectName" component={CollectNameScreen} />
        <Stack.Screen name="CollectPhoneNumber" component={CollectPhoneNumberScreen} />
        <Stack.Screen name="CollectBirthday" component={CollectBirthdayScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </UserSignupProvider>
  );
} 