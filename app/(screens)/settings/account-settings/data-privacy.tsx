import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function DataPrivacyScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}> 
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}> 
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}> 
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} /> 
        </TouchableOpacity> 
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Data & Privacy</Text> 
        <View style={styles.headerRight} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.infoText, { color: currentTheme.colors.text }]}>Download your data or delete your account.</Text>
        <Text style={[styles.infoText, { color: currentTheme.colors.textSecondary }]}>Data management features coming soon.</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  headerRight: { width: 40 },
  content: { flex: 1, padding: 24 },
  infoText: { fontSize: 16, marginBottom: 12 },
}); 