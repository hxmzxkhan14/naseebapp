import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function PremiumFeaturesScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  const premiumFeatures = [
    {
      icon: 'infinite-outline',
      title: 'Unlimited Likes',
      description: 'Like as many profiles as you want without daily limits',
      benefit: 'No more waiting - explore freely'
    },
    {
      icon: 'refresh-outline',
      title: 'Rewind',
      description: 'Undo your last swipe if you made a mistake',
      benefit: 'Second chances on potential matches'
    },
    {
      icon: 'star-outline',
      title: 'Super Likes',
      description: 'Send 5 Super Likes per day to stand out',
      benefit: '3x more likely to get a match'
    },
    {
      icon: 'eye-outline',
      title: 'See Who Likes You',
      description: 'View all the people who have already liked your profile',
      benefit: 'Know your options instantly'
    },
    {
      icon: 'filter-outline',
      title: 'Advanced Filters',
      description: 'Filter by education, lifestyle, interests, and more',
      benefit: 'Find more compatible matches'
    },
    {
      icon: 'flash-outline',
      title: 'Boost',
      description: 'Be one of the top profiles in your area for 30 minutes',
      benefit: 'Get up to 10x more profile views'
    },
    {
      icon: 'location-outline',
      title: 'Passport',
      description: 'Swipe around the world and connect globally',
      benefit: 'Meet people anywhere'
    },
    {
      icon: 'checkmark-circle-outline',
      title: 'Read Receipts',
      description: 'See when your messages have been read',
      benefit: 'Know when to follow up'
    }
  ];

  const subscriptionPlans = [
    {
      name: 'Naseeb Plus',
      duration: '1 Month',
      price: '$9.99',
      features: ['Unlimited Likes', 'Rewind', '5 Super Likes/day', 'See Who Likes You']
    },
    {
      name: 'Naseeb Gold',
      duration: '6 Months',
      price: '$19.99',
      originalPrice: '$59.94',
      features: ['All Plus Features', 'Advanced Filters', 'Boost', 'Passport', 'Read Receipts'],
      popular: true
    },
    {
      name: 'Naseeb Platinum',
      duration: '12 Months',
      price: '$29.99',
      originalPrice: '$119.88',
      features: ['All Gold Features', 'Priority Support', 'Profile Verification', 'Exclusive Events']
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Premium Features</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroSection, { backgroundColor: currentTheme.colors.surface }]}>
          <View style={[styles.heroIcon, { backgroundColor: currentTheme.colors.primary }]}>
            <Ionicons name="star" size={30} color="#fff" />
          </View>
          <Text style={[styles.heroTitle, { color: currentTheme.colors.text }]}>Unlock Premium</Text>
          <Text style={[styles.heroSubtitle, { color: currentTheme.colors.textSecondary }]}>
            Get the most out of Naseeb with premium features designed to help you find meaningful connections faster
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Premium Features</Text>
          {premiumFeatures.map((feature, index) => (
            <View key={index} style={[styles.featureCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.featureHeader}>
                <Ionicons name={feature.icon as any} size={24} color={currentTheme.colors.primary} />
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: currentTheme.colors.text }]}>{feature.title}</Text>
                  <Text style={[styles.featureDescription, { color: currentTheme.colors.textSecondary }]}>{feature.description}</Text>
                </View>
              </View>
              <View style={[styles.benefitBadge, { backgroundColor: currentTheme.colors.primary + '20' }]}>
                <Text style={[styles.benefitText, { color: currentTheme.colors.primary }]}>{feature.benefit}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Choose Your Plan</Text>
          {subscriptionPlans.map((plan, index) => (
            <View key={index} style={[
              styles.planCard, 
              { backgroundColor: currentTheme.colors.surface },
              plan.popular && { borderColor: currentTheme.colors.primary, borderWidth: 2 }
            ]}>
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: currentTheme.colors.primary }]}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <Text style={[styles.planName, { color: currentTheme.colors.text }]}>{plan.name}</Text>
                <Text style={[styles.planDuration, { color: currentTheme.colors.textSecondary }]}>{plan.duration}</Text>
              </View>
              <View style={styles.priceSection}>
                <Text style={[styles.planPrice, { color: currentTheme.colors.primary }]}>{plan.price}</Text>
                {plan.originalPrice && (
                  <Text style={[styles.originalPrice, { color: currentTheme.colors.textSecondary }]}>{plan.originalPrice}</Text>
                )}
              </View>
              <View style={styles.featuresSection}>
                {plan.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={currentTheme.colors.primary} />
                    <Text style={[styles.featureText, { color: currentTheme.colors.textSecondary }]}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.infoSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.infoTitle, { color: currentTheme.colors.text }]}>Subscription Details</Text>
          <View style={styles.infoItem}>
            <Ionicons name="refresh-circle-outline" size={20} color={currentTheme.colors.primary} />
            <Text style={[styles.infoText, { color: currentTheme.colors.textSecondary }]}>
              Subscriptions auto-renew but can be cancelled anytime
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color={currentTheme.colors.primary} />
            <Text style={[styles.infoText, { color: currentTheme.colors.textSecondary }]}>
              Secure payment processing with money-back guarantee
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="help-circle-outline" size={20} color={currentTheme.colors.primary} />
            <Text style={[styles.infoText, { color: currentTheme.colors.textSecondary }]}>
              24/7 premium customer support for subscribers
            </Text>
          </View>
        </View>

        <View style={[styles.footer, { backgroundColor: currentTheme.colors.surface }]}>
          <TouchableOpacity 
            style={[styles.upgradeButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => router.push('/settings/account-settings/subscription-billing')}
          >
            <Ionicons name="star" size={20} color="#fff" />
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
          <Text style={[styles.footerNote, { color: currentTheme.colors.textSecondary }]}>
            Start your free trial today - no commitment required
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
  heroSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
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
  featureCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureContent: {
    marginLeft: 12,
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
  benefitBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 36,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '500',
  },
  planCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planDuration: {
    fontSize: 16,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  featuresSection: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
  },
  infoSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 12,
    flex: 1,
  },
  footer: {
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 12,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footerNote: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 