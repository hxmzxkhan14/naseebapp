// App.tsx
import React from 'react';
import { AuthProvider } from '@/src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from '@/app/(auth)/LoginScreen';
import RegisterScreen from '@/app/(auth)/RegisterScreen';
import HomeScreen from '@/app/(tabs)/HomeScreen';
import { AuthStackParamList } from '@/src/types/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator<AuthStackParamList>();

function Navigation() {
  console.log('[App.tsx] Navigation component rendering...');
  const { user, loading } = useAuth();

  if (loading) {
    console.log('[App.tsx] Navigation: loading is true, rendering ActivityIndicator.');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log('[App.tsx] Navigation: loading is false, user ID:', user ? user.user?.id : 'null');
  return (
    <Stack.Navigator 
      initialRouteName={user ? "Home" : "Login"}
      screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  console.log('[App.tsx] App component rendering...');
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
