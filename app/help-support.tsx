import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function HelpSupportScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const helpCategories = [
    {
      icon: 'person-outline',
      title: 'Account & Profile',
      description: 'Help with account settings, profile management, and verification',
      onPress: () => router.push('/settings/account-settings'),
    },
    {
      icon: 'shield-outline',
      title: 'Privacy & Safety',
      description: 'Learn about privacy settings, blocking users, and reporting issues',
      onPress: () => router.push('/settings/privacy-security'),
    },
    {
      icon: 'heart-outline',
      title: 'Matching & Dating',
      description: 'Tips for better matches, conversation starters, and dating advice',
      onPress: () => Alert.alert('Coming Soon', 'Dating tips and advice will be available soon!'),
    },
    {
      icon: 'card-outline',
      title: 'Subscription & Billing',
      description: 'Manage your premium subscription and billing information',
      onPress: () => router.push('/settings/account-settings/subscription-billing'),
    },
  ];

  const contactOptions = [
    {
      icon: 'mail-outline',
      title: 'Email Support',
      description: 'Get help via email',
      onPress: () => Linking.openURL('mailto:support@naseeb.com'),
    },
    {
      icon: 'chatbubbles-outline',
      title: 'Live Chat',
      description: 'Chat with our support team',
      onPress: () => Alert.alert('Live Chat', 'Live chat support will be available soon!'),
    },
    {
      icon: 'call-outline',
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      onPress: () => Linking.openURL('tel:+1234567890'),
    },
  ];

  const faqItems = [
    {
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account Settings > Data & Privacy to delete your account. This action cannot be undone.',
    },
    {
      question: 'How do I report inappropriate behavior?',
      answer: 'You can report users by tapping the three dots on their profile or in messages. We take all reports seriously.',
    },
    {
      question: 'Is my information safe?',
      answer: 'Yes, we use industry-standard encryption and never share your personal information with third parties.',
    },
    {
      question: 'How do I change my location settings?',
      answer: 'Go to Settings > Account Settings > Location Settings to manage your location preferences.',
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
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>How can we help?</Text>
          {helpCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.helpCard, { backgroundColor: currentTheme.colors.surface }]}
              onPress={item.onPress}
            >
              <View style={styles.helpCardLeft}>
                <Ionicons name={item.icon as any} size={24} color={currentTheme.colors.primary} />
                <View style={styles.helpCardContent}>
                  <Text style={[styles.helpCardTitle, { color: currentTheme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.helpCardDescription, { color: currentTheme.colors.textSecondary }]}>{item.description}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Contact Us</Text>
          {contactOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.contactCard, { backgroundColor: currentTheme.colors.surface }]}
              onPress={item.onPress}
            >
              <View style={styles.contactCardLeft}>
                <Ionicons name={item.icon as any} size={24} color={currentTheme.colors.primary} />
                <View style={styles.contactCardContent}>
                  <Text style={[styles.contactCardTitle, { color: currentTheme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.contactCardDescription, { color: currentTheme.colors.textSecondary }]}>{item.description}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.textSecondary }]}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={[styles.faqCard, { backgroundColor: currentTheme.colors.surface }]}>
              <Text style={[styles.faqQuestion, { color: currentTheme.colors.text }]}>{item.question}</Text>
              <Text style={[styles.faqAnswer, { color: currentTheme.colors.textSecondary }]}>{item.answer}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            Can't find what you're looking for?
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => Linking.openURL('mailto:support@naseeb.com')}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
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
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  helpCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  helpCardContent: {
    marginLeft: 16,
    flex: 1,
  },
  helpCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  helpCardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactCardContent: {
    marginLeft: 16,
    flex: 1,
  },
  contactCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactCardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  faqCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 