import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function SafetyPrivacyScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const safetyTips = [
    {
      icon: 'eye-outline',
      title: 'Protect Your Identity',
      content: 'Don\'t share personal information like your full name, address, workplace, or financial details until you\'ve met and built trust.',
    },
    {
      icon: 'location-outline',
      title: 'Meeting in Person',
      content: 'Always meet in public places for first dates. Let friends know where you\'re going and when you expect to return.',
    },
    {
      icon: 'car-outline',
      title: 'Transportation Safety',
      content: 'Drive yourself or use your own transportation. Avoid getting in someone else\'s car on the first few dates.',
    },
    {
      icon: 'call-outline',
      title: 'Video Chat First',
      content: 'Consider video chatting before meeting in person to verify identity and build comfort.',
    },
  ];

  const privacyControls = [
    {
      icon: 'shield-outline',
      title: 'Profile Visibility',
      content: 'Control who can see your profile and photos. You can hide your profile from certain users or make it visible only to matches.',
    },
    {
      icon: 'location-outline',
      title: 'Location Settings',
      content: 'Manage how your location is shared. You can show approximate distance without revealing your exact location.',
    },
    {
      icon: 'eye-off-outline',
      title: 'Block and Report',
      content: 'Block users who make you uncomfortable and report inappropriate behavior to keep the community safe.',
    },
    {
      icon: 'lock-closed-outline',
      title: 'Data Protection',
      content: 'Your personal data is encrypted and secure. We never share your information with third parties without consent.',
    },
  ];

  const reportingSteps = [
    'Tap the three dots on the user\'s profile',
    'Select "Report" from the menu',
    'Choose the reason for reporting',
    'Provide additional details if needed',
    'Submit the report for review',
  ];

  const emergencyContacts = [
    { title: 'Emergency Services', number: '911', description: 'For immediate danger' },
    { title: 'National Domestic Violence Hotline', number: '1-800-799-7233', description: '24/7 support' },
    { title: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free crisis counseling' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Safety & Privacy</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.alertSection, { backgroundColor: currentTheme.colors.surface, borderLeftColor: currentTheme.colors.primary }]}>
          <View style={styles.alertHeader}>
            <Ionicons name="shield-checkmark" size={24} color={currentTheme.colors.primary} />
            <Text style={[styles.alertTitle, { color: currentTheme.colors.text }]}>Your Safety Comes First</Text>
          </View>
          <Text style={[styles.alertText, { color: currentTheme.colors.textSecondary }]}>
            While most users are genuine, it's important to stay vigilant and protect yourself when dating online.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Safety Guidelines</Text>
          {safetyTips.map((tip, index) => (
            <View key={index} style={[styles.tipCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.tipHeader}>
                <Ionicons name={tip.icon as any} size={24} color={currentTheme.colors.primary} />
                <Text style={[styles.tipTitle, { color: currentTheme.colors.text }]}>{tip.title}</Text>
              </View>
              <Text style={[styles.tipContent, { color: currentTheme.colors.textSecondary }]}>{tip.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Privacy Controls</Text>
          {privacyControls.map((control, index) => (
            <View key={index} style={[styles.tipCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.tipHeader}>
                <Ionicons name={control.icon as any} size={24} color={currentTheme.colors.primary} />
                <Text style={[styles.tipTitle, { color: currentTheme.colors.text }]}>{control.title}</Text>
              </View>
              <Text style={[styles.tipContent, { color: currentTheme.colors.textSecondary }]}>{control.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>How to Report Users</Text>
          <View style={[styles.stepsCard, { backgroundColor: currentTheme.colors.surface }]}>
            {reportingSteps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: currentTheme.colors.primary }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.stepText, { color: currentTheme.colors.textSecondary }]}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Emergency Resources</Text>
          <View style={[styles.emergencyCard, { backgroundColor: currentTheme.colors.surface, borderLeftColor: '#ff6b6b' }]}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="medical-outline" size={24} color="#ff6b6b" />
              <Text style={[styles.emergencyTitle, { color: currentTheme.colors.text }]}>Need Help?</Text>
            </View>
            {emergencyContacts.map((contact, index) => (
              <View key={index} style={styles.contactItem}>
                <Text style={[styles.contactTitle, { color: currentTheme.colors.text }]}>{contact.title}</Text>
                <Text style={[styles.contactNumber, { color: currentTheme.colors.primary }]}>{contact.number}</Text>
                <Text style={[styles.contactDescription, { color: currentTheme.colors.textSecondary }]}>{contact.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => router.push('/settings/privacy-security')}
          >
            <Ionicons name="settings-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Privacy Settings</Text>
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
  alertSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  alertText: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  tipCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  tipContent: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 36,
  },
  stepsCard: {
    padding: 20,
    borderRadius: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  emergencyCard: {
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contactItem: {
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
  },
  footer: {
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 