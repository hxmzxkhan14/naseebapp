import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function FAQScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How do I create a profile?',
          answer: 'Tap the "Sign Up" button, verify your phone number or email, add your photos, write a bio, and set your preferences. Make sure to add at least 3 photos for the best experience.'
        },
        {
          question: 'Why isn\'t my profile showing up?',
          answer: 'Your profile may need verification or you might be outside other users\' distance preferences. Make sure your location is enabled and try expanding your distance range.'
        },
        {
          question: 'How do I verify my profile?',
          answer: 'Go to Settings > Account Settings > Profile Verification and follow the instructions to take a verification selfie. Verified profiles get more matches.'
        }
      ]
    },
    {
      title: 'Matching & Messaging',
      items: [
        {
          question: 'How does matching work?',
          answer: 'When you and another person both like each other, it creates a match. You can then start messaging each other. Matches appear in your Messages tab.'
        },
        {
          question: 'Why am I not getting matches?',
          answer: 'Try updating your photos, expanding your age/distance range, or being more active on the app. Make sure your bio is filled out and represents your personality.'
        },
        {
          question: 'Can I message someone without matching?',
          answer: 'No, both people must like each other first to start messaging. This ensures all conversations are mutual and consensual.'
        },
        {
          question: 'How do I unmatch someone?',
          answer: 'Go to your conversation, tap the three dots in the top right, and select "Unmatch". This will remove the conversation and prevent future contact.'
        }
      ]
    },
    {
      title: 'Premium Features',
      items: [
        {
          question: 'What are Super Likes?',
          answer: 'Super Likes show someone you\'re really interested before they decide on you. They\'re 3x more likely to result in a match. Free users get 1 per day, premium users get 5.'
        },
        {
          question: 'How does Boost work?',
          answer: 'Boost makes your profile one of the top profiles in your area for 30 minutes, resulting in up to 10x more views. You\'ll get a notification when your Boost starts.'
        },
        {
          question: 'Can I see who liked me?',
          answer: 'Yes, with a premium subscription you can see everyone who has already liked your profile. This feature helps you make more strategic decisions about who to like back.'
        }
      ]
    },
    {
      title: 'Safety & Privacy',
      items: [
        {
          question: 'How do I report someone?',
          answer: 'Tap the three dots on their profile or in your conversation, select "Report", choose a reason, and provide details. We review all reports within 24 hours.'
        },
        {
          question: 'How do I block someone?',
          answer: 'Go to their profile or conversation, tap the three dots, and select "Block". They won\'t be able to see your profile or contact you anymore.'
        },
        {
          question: 'Is my personal information safe?',
          answer: 'Yes, we use industry-standard encryption and never share your personal information. Your data is stored securely and you control what information is visible.'
        },
        {
          question: 'Can I hide my profile temporarily?',
          answer: 'Yes, go to Settings > Privacy & Security > Hide Profile. Your profile won\'t appear in the stack but you can still message existing matches.'
        }
      ]
    },
    {
      title: 'Account Management',
      items: [
        {
          question: 'How do I delete my account?',
          answer: 'Go to Settings > Account Settings > Data & Privacy > Delete Account. This permanently removes all your data and cannot be undone.'
        },
        {
          question: 'How do I change my email or phone number?',
          answer: 'Go to Settings > Account Settings > Personal Information. You\'ll need to verify any new email or phone number before the change takes effect.'
        },
        {
          question: 'Can I pause my account instead of deleting it?',
          answer: 'Yes, you can hide your profile in Privacy Settings. This keeps your account active but hidden from other users. You can reactivate anytime.'
        },
        {
          question: 'How do I cancel my subscription?',
          answer: 'Go to Settings > Account Settings > Subscription & Billing, or cancel through your App Store/Google Play account. You\'ll keep premium features until the period ends.'
        }
      ]
    }
  ];

  const toggleExpanded = (categoryIndex: number, itemIndex: number) => {
    const key = categoryIndex * 1000 + itemIndex;
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(id => id !== key)
        : [...prev, key]
    );
  };

  const isExpanded = (categoryIndex: number, itemIndex: number) => {
    const key = categoryIndex * 1000 + itemIndex;
    return expandedItems.includes(key);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>FAQ</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.introSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Ionicons name="help-circle" size={40} color={currentTheme.colors.primary} />
          <Text style={[styles.introTitle, { color: currentTheme.colors.text }]}>Frequently Asked Questions</Text>
          <Text style={[styles.introText, { color: currentTheme.colors.textSecondary }]}>
            Find answers to common questions about using Naseeb. Can't find what you're looking for? Contact our support team.
          </Text>
        </View>

        {faqCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: currentTheme.colors.text }]}>{category.title}</Text>
            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} style={[styles.faqItem, { backgroundColor: currentTheme.colors.surface }]}>
                <TouchableOpacity
                  style={styles.questionContainer}
                  onPress={() => toggleExpanded(categoryIndex, itemIndex)}
                >
                  <View style={styles.questionContent}>
                    <Text style={[styles.questionText, { color: currentTheme.colors.text }]}>{item.question}</Text>
                    <Ionicons 
                      name={isExpanded(categoryIndex, itemIndex) ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={currentTheme.colors.textSecondary} 
                    />
                  </View>
                </TouchableOpacity>
                {isExpanded(categoryIndex, itemIndex) && (
                  <View style={styles.answerContainer}>
                    <Text style={[styles.answerText, { color: currentTheme.colors.textSecondary }]}>
                      {item.answer}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={[styles.contactSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.contactTitle, { color: currentTheme.colors.text }]}>Still need help?</Text>
          <Text style={[styles.contactText, { color: currentTheme.colors.textSecondary }]}>
            Our support team is here to help with any questions not covered in the FAQ.
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => router.push('/settings/help-support')}
          >
            <Ionicons name="chatbubbles" size={20} color="#fff" />
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
  introSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  faqItem: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  questionContainer: {
    padding: 20,
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 16,
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
  },
  answerText: {
    fontSize: 15,
    lineHeight: 22,
  },
  contactSection: {
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 