import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider, DarkTheme } from '@react-navigation/native'; // For theming if needed globally

export default function RootLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until loading is false

    const inAuthGroup = segments[0] === '(auth)';
    const inAppGroup = segments[0] === '(tabs)';

    console.log('[RootLayout] Auth state check: User:', user ? user.user?.id : 'null', 'Loading:', loading, 'Segments:', segments.join('/'));

    if (user && !inAppGroup) {
      console.log('[RootLayout] User authenticated, navigating to (tabs)');
      router.replace('/(tabs)/'); // Navigate to the tabs group
    } else if (!user && !inAuthGroup) {
      console.log('[RootLayout] User not authenticated, navigating to (auth)');
      router.replace('/(auth)/'); // Navigate to the auth group, default screen (LoginScreen)
    }
  }, [user, loading, segments, router]);

  if (loading) {
    return (
      <ThemeProvider value={DarkTheme}> {/* Ensure loading screen also has theme */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: DarkTheme.colors.background }}>
          <ActivityIndicator size="large" color={DarkTheme.colors.primary} />
        </View>
      </ThemeProvider>
    );
  }

  // This layout can be a simple Stack that delegates to group layouts
  return (
    <ThemeProvider value={DarkTheme}> {/* ThemeProvider can be here if not in App.tsx for Slot */}
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            {/* Example for a modal screen if you add one at root level later */}
            {/* <Stack.Screen name="settingsModal" options={{ presentation: 'modal' }} /> */}
        </Stack>
    </ThemeProvider>
  );
}
