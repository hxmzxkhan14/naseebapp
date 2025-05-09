import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationStackParamList } from '@/src/types/navigation';
import { RegistrationProvider } from '@/src/context/RegistrationContext';

import CollectNameScreen from './CollectNameScreen';
import CollectPhoneNumberScreen from './CollectPhoneNumberScreen';
import CollectBirthdayScreen from './CollectBirthdayScreen';
import CreateAccountScreen from './CreateAccountScreen';

const Stack = createStackNavigator<RegistrationStackParamList>();

const SignUpNavigator = () => {
  return (
    <RegistrationProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CollectName" component={CollectNameScreen} />
        <Stack.Screen name="CollectPhoneNumber" component={CollectPhoneNumberScreen} />
        <Stack.Screen name="CollectBirthday" component={CollectBirthdayScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </RegistrationProvider>
  );
};

export default SignUpNavigator; 