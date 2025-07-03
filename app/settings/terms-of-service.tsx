import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function TermsOfServiceScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Terms of Service</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>1. Acceptance of Terms</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            By accessing and using Naseeb, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>2. Use License</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            Permission is granted to temporarily download one copy of the app for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Modify or copy the materials
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Use the materials for any commercial purpose
          </Text>
          <Text style={[styles.bulletPoint, { color: currentTheme.colors.textSecondary }]}>
            • Remove any copyright or other proprietary notations
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>3. User Conduct</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            Users must behave respectfully and in accordance with Islamic values. Any form of harassment, 
            inappropriate content, or behavior that violates community guidelines will result in account suspension.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>4. Privacy</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
            to understand our practices regarding the collection and use of your information.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>5. Disclaimer</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            The materials on Naseeb are provided on an 'as is' basis. Naseeb makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including without limitation, implied warranties or 
            conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>6. Limitations</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            In no event shall Naseeb or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or 
            inability to use the materials on Naseeb.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>7. Revisions and Errata</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            The materials appearing on Naseeb could include technical, typographical, or photographic errors. 
            Naseeb does not warrant that any of the materials on its app are accurate, complete or current.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>8. Links</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            Naseeb has not reviewed all of the sites linked to its app and is not responsible for the contents 
            of any such linked site. The inclusion of any link does not imply endorsement by Naseeb of the site.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>9. Modifications</Text>
          <Text style={[styles.sectionText, { color: currentTheme.colors.textSecondary }]}>
            Naseeb may revise these terms of service for its app at any time without notice. By using this app 
            you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
          </Text>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            Last updated: January 2024
          </Text>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            For questions about these Terms of Service, please contact us at legal@naseeb.com
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