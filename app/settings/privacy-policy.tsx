import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Privacy Policy</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Introduction</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            At Naseeb, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you use our app.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Information We Collect</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            We collect information you provide directly to us, such as when you create an account, 
            complete your profile, or communicate with other users. This may include:
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Personal information (name, email, phone number)
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Profile information (photos, bio, preferences)
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Location data (with your consent)
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Communication data (messages, likes, matches)
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>How We Use Your Information</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            We use the information we collect to:
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Provide and maintain our dating service
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Match you with compatible users
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Send you notifications and updates
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Improve our app and user experience
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Ensure safety and prevent fraud
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Information Sharing</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except in the following circumstances:
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • With other users (as part of the matching process)
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • With service providers who assist in app operations
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • When required by law or to protect our rights
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Data Security</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of 
            transmission over the internet is 100% secure.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Your Rights</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            You have the right to:
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Access your personal information
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Update or correct your information
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Delete your account and data
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Opt out of certain communications
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Request data portability
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Cookies and Tracking</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            We use cookies and similar tracking technologies to enhance your experience, 
            analyze app usage, and provide personalized content. You can control cookie 
            settings through your device preferences.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Children's Privacy</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            Naseeb is not intended for children under 18 years of age. We do not knowingly 
            collect personal information from children under 18. If you are a parent or guardian 
            and believe your child has provided us with personal information, please contact us.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Changes to This Policy</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            We may update this privacy policy from time to time. We will notify you of any 
            changes by posting the new policy on this page and updating the "Last updated" date.
          </Text>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            Last updated: January 2024
          </Text>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            For privacy-related questions, please contact us at privacy@naseeb.com
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
  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 20,
    marginBottom: 8,
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