import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function MatchingMessagingScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const matchingTips = [
    {
      icon: 'heart-outline',
      title: 'How Matching Works',
      content: 'When you like someone and they like you back, it creates a match. You can then start messaging each other to get to know one another better.',
    },
    {
      icon: 'eye-outline',
      title: 'Profile Browsing',
      content: 'Take time to read profiles carefully. Look at photos, read bios, and check compatibility factors before making a decision.',
    },
    {
      icon: 'refresh-outline',
      title: 'Rewind Feature',
      content: 'Made a mistake? Premium users can rewind their last action to reconsider a profile they accidentally passed on.',
    },
    {
      icon: 'star-outline',
      title: 'Super Likes',
      content: 'Send a super like to show someone you\'re really interested. This makes your profile stand out in their stack.',
    },
  ];

  const messagingTips = [
    {
      icon: 'chatbubbles-outline',
      title: 'Starting Conversations',
      content: 'Reference something from their profile to show you\'re genuinely interested. Ask open-ended questions that encourage responses.',
    },
    {
      icon: 'time-outline',
      title: 'Response Timing',
      content: 'Don\'t feel pressured to respond immediately, but don\'t wait too long either. A few hours to a day is usually appropriate.',
    },
    {
      icon: 'happy-outline',
      title: 'Keep It Light',
      content: 'Start with light, fun topics. Save deeper conversations for when you\'ve built more rapport and trust.',
    },
    {
      icon: 'person-outline',
      title: 'Be Yourself',
      content: 'Authenticity is key. Don\'t try to be someone you\'re not - the right person will appreciate the real you.',
    },
  ];

  const conversationStarters = [
    "I noticed you love hiking! What's your favorite trail?",
    "Your photos from [location] look amazing! Tell me about that trip.",
    "I see we both enjoy [shared interest]. How did you get into that?",
    "Your bio made me smile! What's the story behind [specific detail]?",
    "I'm curious about your favorite book/movie mentioned in your profile.",
  ];

  const redFlags = [
    'Asking for money or financial information',
    'Pushing to meet immediately or in private',
    'Being overly sexual or inappropriate',
    'Refusing to video chat or talk on the phone',
    'Stories that don\'t add up or seem inconsistent',
    'Getting angry when you set boundaries',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Matching & Messaging</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>How Matching Works</Text>
          {matchingTips.map((tip, index) => (
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
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Messaging Best Practices</Text>
          {messagingTips.map((tip, index) => (
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
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Great Conversation Starters</Text>
          <View style={[styles.startersCard, { backgroundColor: currentTheme.colors.surface }]}>
            {conversationStarters.map((starter, index) => (
              <View key={index} style={styles.starterItem}>
                <Ionicons name="chatbubble-outline" size={16} color={currentTheme.colors.primary} />
                <Text style={[styles.starterText, { color: currentTheme.colors.textSecondary }]}>"{starter}"</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Red Flags to Watch For</Text>
          <View style={[styles.warningCard, { backgroundColor: currentTheme.colors.surface, borderLeftColor: '#ff6b6b' }]}>
            <View style={styles.warningHeader}>
              <Ionicons name="warning-outline" size={24} color="#ff6b6b" />
              <Text style={[styles.warningTitle, { color: currentTheme.colors.text }]}>Stay Safe</Text>
            </View>
            {redFlags.map((flag, index) => (
              <View key={index} style={styles.flagItem}>
                <Ionicons name="close-circle" size={16} color="#ff6b6b" />
                <Text style={[styles.flagText, { color: currentTheme.colors.textSecondary }]}>{flag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.footerText, { color: currentTheme.colors.textSecondary }]}>
            Remember: Quality connections take time. Be patient, stay safe, and trust your instincts.
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
  startersCard: {
    padding: 20,
    borderRadius: 12,
  },
  starterItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  starterText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
    flex: 1,
    fontStyle: 'italic',
  },
  warningCard: {
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  flagItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  flagText: {
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
    fontStyle: 'italic',
  },
}); 