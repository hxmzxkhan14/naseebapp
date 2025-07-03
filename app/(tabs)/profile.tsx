import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, isLoggingOut } = useAuth();
  const { currentTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/profile/edit')}
          >
            <Ionicons name="create-outline" size={24} color={currentTheme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.profileSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }} 
            style={styles.profileImage} 
          />
          <Text style={[styles.name, { color: currentTheme.colors.text }]}>
            {user?.email ? user.email.split('@')[0] : 'User'}
          </Text>
          <Text style={[styles.email, { color: currentTheme.colors.textSecondary }]}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/help-support')}
          >
            <Ionicons name="help-circle-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/about')}
          >
            <Ionicons name="information-circle-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>About</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: currentTheme.colors.error }]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  editButton: {
    marginLeft: 'auto',
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#C7C7CC',
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7CC',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
}); 