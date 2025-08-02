import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Personal Information',
      subtitle: 'Update your name, email, and basic details',
      onPress: () => router.push('/(screens)/settings/account-settings/personal-info'),
    },
    {
      icon: 'camera-outline',
      title: 'Profile Photos',
      subtitle: 'Manage your profile pictures',
      onPress: () => router.push('/(screens)/settings/account-settings/profile-photos'),
    },
    {
      icon: 'location-outline',
      title: 'Location Settings',
      subtitle: 'Control your location visibility and preferences',
      onPress: () => router.push('/(screens)/settings/account-settings/location-settings'),
    },
    {
      icon: 'language-outline',
      title: 'Language & Region',
      subtitle: 'Change app language and regional settings',
      onPress: () => router.push('/(screens)/settings/account-settings/language-region'),
    },
    {
      icon: 'card-outline',
      title: 'Subscription & Billing',
      subtitle: 'Manage your premium subscription',
      onPress: () => router.push('/(screens)/settings/account-settings/subscription-billing'),
    },
    {
      icon: 'download-outline',
      title: 'Data & Privacy',
      subtitle: 'Download your data or delete your account',
      onPress: () => router.push('/(screens)/settings/account-settings/data-privacy'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Account Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon as any} size={24} color={currentTheme.colors.primary} />
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemTitle, { color: currentTheme.colors.text }]}>{item.title}</Text>
                <Text style={[styles.menuItemSubtitle, { color: currentTheme.colors.textSecondary }]}>{item.subtitle}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemContent: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
}); 