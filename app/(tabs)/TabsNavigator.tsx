import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoggedInScreen } from '@/src/types/navigation'; // Assuming this type defines the screen names

// Import screen components using their restored original filenames
import HomeScreen from '@/app/(tabs)/HomeScreen/index';
import MessagesScreen from '@/app/(tabs)/MessagesScreen/index';
import ActivityScreen from '@/app/(tabs)/ActivityScreen/index';
import ProfileScreen from '@/app/(tabs)/ProfileScreen/index';

const Stack = createStackNavigator<LoggedInScreen>();

export default function TabsNavigator() {
  console.log('[TabsNavigator.tsx] Rendering TabNavigator with correct screen imports...');
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  )}