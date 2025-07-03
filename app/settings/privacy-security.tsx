import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [readReceipts, setReadReceipts] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const privacySettings = [
    {
      icon: 'eye-outline',
      title: 'Profile Visibility',
      subtitle: 'Control who can see your profile',
      type: 'switch',
      value: profileVisibility,
      onValueChange: setProfileVisibility,
    },
    {
      icon: 'location-outline',
      title: 'Location Sharing',
      subtitle: 'Share your location with matches',
      type: 'switch',
      value: locationSharing,
      onValueChange: setLocationSharing,
    },
    {
      icon: 'checkmark-done-outline',
      title: 'Read Receipts',
      subtitle: 'Show when you read messages',
      type: 'switch',
      value: readReceipts,
      onValueChange: setReadReceipts,
    },
    {
      icon: 'wifi-outline',
      title: 'Online Status',
      subtitle: 'Show when you are online',
      type: 'switch',
      value: onlineStatus,
      onValueChange: setOnlineStatus,
    },
  ];

  const securitySettings = [
    {
      icon: 'lock-closed-outline',
      title: 'Two-Factor Authentication',
      subtitle: 'Add an extra layer of security',
      onPress: () => Alert.alert('Coming Soon', 'Two-factor authentication will be available soon!'),
    },
    {
      icon: 'shield-outline',
      title: 'Blocked Users',
      subtitle: 'Manage your blocked users list',
      onPress: () => Alert.alert('Coming Soon', 'Blocked users management will be available soon!'),
    },
    {
      icon: 'notifications-off-outline',
      title: 'Report & Safety',
      subtitle: 'Report issues and get help',
      onPress: () => Alert.alert('Coming Soon', 'Report and safety features will be available soon!'),
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <View
      key={index}
      style={[styles.settingItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={item.icon as any} size={24} color={currentTheme.colors.primary} />
        <View style={styles.settingItemContent}>
          <Text style={[styles.settingItemTitle, { color: currentTheme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.settingItemSubtitle, { color: currentTheme.colors.textSecondary }]}>{item.subtitle}</Text>
        </View>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: currentTheme.colors.border, true: currentTheme.colors.primary }}
          thumbColor="#fff"
        />
      ) : (
        <TouchableOpacity onPress={item.onPress}>
          <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Privacy & Security</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Privacy Settings</Text>
          {privacySettings.map((item, index) => renderSettingItem(item, index))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Security</Text>
          {securitySettings.map((item, index) => renderSettingItem(item, index))}
        </View>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemContent: {
    marginLeft: 16,
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingItemSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
}); 