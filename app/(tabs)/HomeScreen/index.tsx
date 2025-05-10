import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, LoggedInScreen } from '@/src/types/navigation';
import { useNavigation } from 'expo-router';

type HomeScreenNavigationProp = StackNavigationProp<LoggedInScreen, 'Home'>;

export default function HomeScreen() {

  const appNavigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Naseeb</Text>
      <Text style={styles.subtitle}>Start swiping to find your match ✨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
