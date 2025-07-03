import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function GettingStartedScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const steps = [
    {
      icon: 'person-add-outline',
      title: '1. Create Your Profile',
      content: 'Start by creating a compelling profile that represents who you are. Add your best photos, write an authentic bio, and fill out your preferences to help us find better matches for you.',
    },
    {
      icon: 'camera-outline',
      title: '2. Upload Quality Photos',
      content: 'Add 3-6 high-quality photos that show your personality. Include a clear headshot, full-body photo, and pictures of you doing activities you enjoy. Avoid group photos as your main picture.',
    },
    {
      icon: 'settings-outline',
      title: '3. Set Your Preferences',
      content: 'Define what you\'re looking for in a partner. Set your age range, distance preferences, and other important criteria to receive more compatible matches.',
    },
    {
      icon: 'search-outline',
      title: '4. Start Exploring',
      content: 'Go to the Explore tab to start browsing profiles. Swipe right on people you\'re interested in, or tap the heart icon to like them.',
    },
    {
      icon: 'heart-outline',
      title: '5. Make Connections',
      content: 'When you and someone else both like each other, it\'s a match! You can then start messaging and get to know each other better.',
    },
    {
      icon: 'chatbubbles-outline',
      title: '6. Start Conversations',
      content: 'Send thoughtful messages that show you\'ve read their profile. Ask questions about their interests and share something about yourself.',
    },
  ];

  const tips = [
    'Be authentic and honest in your profile',
    'Use recent photos that look like you',
    'Write a bio that shows your personality',
    'Be respectful and kind in all interactions',
    'Take your time to read profiles before swiping',
    'Don\'t take rejections personally',
    'Stay safe by meeting in public places',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Getting Started</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Ionicons name="heart" size={40} color={currentTheme.colors.primary} />
          <Text style={[styles.welcomeTitle, { color: currentTheme.colors.text }]}>Welcome to Naseeb!</Text>
          <Text style={[styles.welcomeText, { color: currentTheme.colors.textSecondary }]}>
            Let's help you get started on your journey to find meaningful connections. Follow these steps to make the most of your experience.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Step-by-Step Guide</Text>
          {steps.map((step, index) => (
            <View key={index} style={[styles.stepCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.stepHeader}>
                <Ionicons name={step.icon as any} size={24} color={currentTheme.colors.primary} />
                <Text style={[styles.stepTitle, { color: currentTheme.colors.text }]}>{step.title}</Text>
              </View>
              <Text style={[styles.stepContent, { color: currentTheme.colors.textSecondary }]}>{step.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Pro Tips for Success</Text>
          <View style={[styles.tipsCard, { backgroundColor: currentTheme.colors.surface }]}>
            {tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={currentTheme.colors.primary} />
                <Text style={[styles.tipText, { color: currentTheme.colors.textSecondary }]}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            Ready to start your journey? Head to your profile to complete your setup!
          </Text>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => router.push('/profile/edit')}
          >
            <Text style={styles.actionButtonText}>Edit My Profile</Text>
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
  welcomeSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
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
  stepCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  stepContent: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 36,
  },
  tipsCard: {
    padding: 20,
    borderRadius: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
    flex: 1,
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
  actionButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 