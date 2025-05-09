import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform, TextStyle, StyleSheet } from 'react-native';
// import { UserSignupProvider } from '@/src/context/UserSignupContext'; // No longer needed here

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    // <UserSignupProvider> // Removed
    <ThemeProvider value={DarkTheme}> {/* Or based on colorScheme */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'black',
          },
        }}
      />
    </ThemeProvider>
    // </UserSignupProvider> // Removed
  );
} 