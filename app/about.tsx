import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function AboutScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const appInfo = {
    name: 'Naseeb',
    version: '1.0.0',
    description: 'Find your perfect match with Naseeb, the premier Muslim dating app designed to help you find meaningful relationships based on shared values and faith.',
    tagline: 'Where faith meets love',
  };

  const aboutSections = [
    {
      icon: 'heart-outline',
      title: 'Our Mission',
      content: 'To create a safe, respectful, and faith-based platform where Muslims can find meaningful relationships and build families grounded in Islamic values.',
    },
    {
      icon: 'shield-outline',
      title: 'Our Values',
      content: 'We prioritize privacy, safety, and respect for Islamic traditions while providing a modern, user-friendly dating experience.',
    },
    {
      icon: 'people-outline',
      title: 'Our Community',
      content: 'Join thousands of Muslims worldwide who are looking for serious relationships and marriage in a halal environment.',
    },
  ];

  const legalLinks = [
    {
      icon: 'document-text-outline',
      title: 'Terms of Service',
      onPress: () => router.push('/settings/terms-of-service'),
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      onPress: () => router.push('/settings/privacy-policy'),
    },
    {
      icon: 'cookies-outline',
      title: 'Cookie Policy',
      onPress: () => Alert.alert('Cookie Policy', 'Learn about how we use cookies and similar technologies to improve your experience on Naseeb.'),
    },
  ];

  const socialLinks = [
    {
      icon: 'logo-facebook',
      title: 'Facebook',
      onPress: () => Linking.openURL('https://facebook.com/naseeb'),
    },
    {
      icon: 'logo-instagram',
      title: 'Instagram',
      onPress: () => Linking.openURL('https://instagram.com/naseeb'),
    },
    {
      icon: 'logo-twitter',
      title: 'Twitter',
      onPress: () => Linking.openURL('https://twitter.com/naseeb'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>About Naseeb</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.appInfo, { backgroundColor: currentTheme.colors.surface }]}>
          <View style={[styles.appIcon, { backgroundColor: currentTheme.colors.primary }]}>
            <Ionicons name="heart" size={40} color="#fff" />
          </View>
          <Text style={[styles.appName, { color: currentTheme.colors.text }]}>{appInfo.name}</Text>
          <Text style={[styles.appVersion, { color: currentTheme.colors.textSecondary }]}>Version {appInfo.version}</Text>
          <Text style={[styles.appTagline, { color: currentTheme.colors.primary }]}>{appInfo.tagline}</Text>
          <Text style={[styles.appDescription, { color: currentTheme.colors.textSecondary }]}>{appInfo.description}</Text>
        </View>

        <View style={styles.section}>
          {aboutSections.map((section, index) => (
            <View key={index} style={[styles.aboutCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.aboutCardHeader}>
                <Ionicons name={section.icon as any} size={24} color={currentTheme.colors.primary} />
                <Text style={[styles.aboutCardTitle, { color: currentTheme.colors.text }]}>{section.title}</Text>
              </View>
              <Text style={[styles.aboutCardContent, { color: currentTheme.colors.textSecondary }]}>{section.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Legal</Text>
          {legalLinks.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={24} color={currentTheme.colors.primary} />
                <Text style={[styles.menuItemTitle, { color: currentTheme.colors.text }]}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Follow Us</Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: currentTheme.colors.surface }]}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon as any} size={24} color={currentTheme.colors.primary} />
                <Text style={[styles.socialButtonText, { color: currentTheme.colors.text }]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            © 2024 Naseeb. All rights reserved.
          </Text>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            Made with ❤️ for the Muslim community
          </Text>
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
    padding: 20,
  },
  appInfo: {
    alignItems: 'center',
    padding: 30,
    marginBottom: 20,
    borderRadius: 16,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  aboutCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  aboutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  aboutCardContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    marginLeft: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  socialButtonText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
}); 