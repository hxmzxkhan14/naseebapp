import { Stack } from 'expo-router';
import { UserSignupProvider } from '@/src/context/UserSignupContext';

export default function SignUpLayout() {
  return (
    <UserSignupProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserSignupProvider>
  );
} 