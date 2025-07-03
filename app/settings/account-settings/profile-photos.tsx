import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfilePhotosScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}> 
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}> 
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}> 
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} /> 
        </TouchableOpacity> 
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Profile Photos</Text> 
        <View style={styles.headerRight} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.infoText, { color: currentTheme.colors.text }]}>Your profile photos:</Text>
        <View style={styles.photoRow}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.photo} />
          <Image source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg' }} style={styles.photo} />
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }} style={styles.photo} />
        </View>
        <Text style={[styles.infoText, { color: currentTheme.colors.textSecondary }]}>Photo management coming soon.</Text>
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
  photoRow: { flexDirection: 'row', marginBottom: 16 },
  photo: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
}); 