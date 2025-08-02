import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function HelpSupportScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const helpTopics = [
    {
      icon: 'person-add-outline',
      title: 'Getting Started',
      subtitle: 'Learn how to create your profile and start matching',
      onPress: () => router.push('/(screens)/settings/help-support/getting-started'),
    },
    {
      icon: 'heart-outline',
      title: 'Matching & Messaging',
      subtitle: 'How to like, match, and chat with others',
      onPress: () => router.push('/(screens)/settings/help-support/matching-messaging'),
    },
    {
      icon: 'shield-outline',
      title: 'Safety & Privacy',
      subtitle: 'Stay safe while using the app',
      onPress: () => router.push('/(screens)/settings/help-support/safety-privacy'),
    },
    {
      icon: 'card-outline',
      title: 'Premium Features',
      subtitle: 'Unlock advanced features with premium',
      onPress: () => router.push('/(screens)/settings/help-support/premium-features'),
    },
    {
      icon: 'settings-outline',
      title: 'Account Settings',
      subtitle: 'Manage your account and preferences',
      onPress: () => router.push('/(screens)/settings/account-settings'),
    },
  ];

  const supportOptions = [
    {
      icon: 'chatbubbles-outline',
      title: 'Contact Support',
      subtitle: 'Get help from our support team',
      onPress: () => Alert.alert('Contact Support', 'Our support team is available 24/7. You can reach us through the app or email us at support@naseeb.com'),
    },
    {
      icon: 'document-text-outline',
      title: 'FAQ',
      subtitle: 'Frequently asked questions',
      onPress: () => router.push('/(screens)/settings/help-support/faq'),
    },
    {
      icon: 'bug-outline',
      title: 'Report a Bug',
      subtitle: 'Help us improve the app',
      onPress: () => Alert.alert('Report a Bug', 'Found a bug? Help us improve by reporting it. Include details about what happened and your device information.'),
    },
    {
      icon: 'star-outline',
      title: 'Rate the App',
      subtitle: 'Share your feedback',
      onPress: () => Alert.alert('Rate the App', 'Enjoying Naseeb? Please rate us on the App Store and share your feedback to help others discover our app.'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Help & Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Help Topics</Text>
          {helpTopics.map((item, index) => (
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
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Support</Text>
          {supportOptions.map((item, index) => (
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
        </View>

        <View style={[styles.contactInfo, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.contactTitle, { color: currentTheme.colors.text }]}>Need Immediate Help?</Text>
          <Text style={[styles.contactText, { color: currentTheme.colors.textSecondary }]}>
            Our support team is available 24/7 to help you with any questions or concerns.
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => Alert.alert('Contact Us', 'Email: support@naseeb.com\nPhone: +1 (555) 123-4567\nHours: 24/7')}
          >
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
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
  contactInfo: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 