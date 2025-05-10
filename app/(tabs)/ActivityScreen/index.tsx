import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInScreen } from '@/src/types/navigation';

type ActivityNavigationProp = StackNavigationProp<LoggedInScreen, 'Activity'>;


export default function ActivityScreen() {
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
