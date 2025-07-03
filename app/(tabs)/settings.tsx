import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { currentTheme, theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Preferences</Text>
          
          <View style={[styles.settingItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={24} color={currentTheme.colors.text} />
              <Text style={[styles.settingText, { color: currentTheme.colors.text }]}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: currentTheme.colors.border, true: currentTheme.colors.primary }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={[styles.settingItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={24} color={currentTheme.colors.text} />
              <Text style={[styles.settingText, { color: currentTheme.colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: currentTheme.colors.border, true: currentTheme.colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Account</Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings/account-settings')}
          >
            <Ionicons name="person-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Account Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings/privacy-security')}
          >
            <Ionicons name="lock-closed-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings/help-support')}
          >
            <Ionicons name="help-circle-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>About</Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings/about')}
          >
            <Ionicons name="information-circle-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>About Naseeb</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings/terms-of-service')}
          >
            <Ionicons name="document-text-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
            onPress={() => router.push('/settings/privacy-policy')}
          >
            <Ionicons name="shield-outline" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
}); 