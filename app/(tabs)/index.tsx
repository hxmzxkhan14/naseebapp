import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Naseeb</Text>
          <Text style={styles.subtitle}>Your destiny awaits</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Getting Started</Text>
            <Text style={styles.cardText}>
              This is your clean, well-structured Naseeb app. Ready for future implementations!
            </Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Features</Text>
            <Text style={styles.cardText}>
              • Expo Router for navigation{'\n'}
              • TypeScript for type safety{'\n'}
              • React Query for data fetching{'\n'}
              • Supabase for backend{'\n'}
              • Clean folder structure
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 