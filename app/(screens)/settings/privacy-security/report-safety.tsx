import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface ReportData {
  type: string;
  description: string;
  evidence?: string;
  reportedUserId?: string;
  reportedUserName?: string;
}

export default function ReportSafetyScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  
  // Backend-ready state management
  const [activeReport, setActiveReport] = useState<ReportData | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [reportedUserId, setReportedUserId] = useState('');
  const [reportedUserName, setReportedUserName] = useState('');
  const [evidence, setEvidence] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reportTypes = [
    {
      id: 'harassment',
      title: 'Harassment or Bullying',
      subtitle: 'Unwanted contact, threats, or intimidation',
      icon: 'warning-outline',
      color: '#FF5722',
    },
    {
      id: 'spam',
      title: 'Spam or Scam',
      subtitle: 'Unwanted promotional content or fraudulent activity',
      icon: 'mail-unread-outline',
      color: '#FF9800',
    },
    {
      id: 'inappropriate',
      title: 'Inappropriate Content',
      subtitle: 'Sexual, violent, or offensive material',
      icon: 'eye-off-outline',
      color: '#F44336',
    },
    {
      id: 'fake-profile',
      title: 'Fake Profile',
      subtitle: 'Impersonation or false identity',
      icon: 'person-circle-outline',
      color: '#9C27B0',
    },
    {
      id: 'minor',
      title: 'Underage User',
      subtitle: 'User appears to be under 18',
      icon: 'shield-outline',
      color: '#E91E63',
    },
    {
      id: 'other',
      title: 'Other Safety Concern',
      subtitle: 'Something else that makes you feel unsafe',
      icon: 'alert-circle-outline',
      color: '#607D8B',
    },
  ];

  const safetyResources = [
    {
      title: 'Emergency Services',
      subtitle: 'Call 911 for immediate danger',
      icon: 'call-outline',
      action: () => Linking.openURL('tel:911'),
      color: '#F44336',
    },
    {
      title: 'Crisis Text Line',
      subtitle: 'Text HOME to 741741',
      icon: 'chatbubble-outline',
      action: () => Linking.openURL('sms:741741&body=HOME'),
      color: '#2196F3',
    },
    {
      title: 'National Domestic Violence Hotline',
      subtitle: '1-800-799-7233',
      icon: 'heart-outline',
      action: () => Linking.openURL('tel:1-800-799-7233'),
      color: '#9C27B0',
    },
    {
      title: 'Cyber Crime Reporting',
      subtitle: 'Report to IC3.gov',
      icon: 'shield-checkmark-outline',
      action: () => Linking.openURL('https://www.ic3.gov/'),
      color: '#4CAF50',
    },
  ];

  const handleSubmitReport = async () => {
    if (!reportType || !description.trim()) {
      Alert.alert('Incomplete Report', 'Please select a report type and provide a description.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportData: ReportData = {
        type: reportType,
        description: description.trim(),
        evidence: evidence.trim() || undefined,
        reportedUserId: reportedUserId.trim() || undefined,
        reportedUserName: reportedUserName.trim() || undefined,
      };

      // In real app, this would be sent to backend
      console.log('Report submitted:', reportData);
      
      setActiveReport(reportData);
      setShowReportForm(false);
      
      // Reset form
      setReportType('');
      setDescription('');
      setReportedUserId('');
      setReportedUserName('');
      setEvidence('');
      
      Alert.alert(
        'Report Submitted',
        'Thank you for your report. Our safety team will review it within 24 hours. You can check the status in your report history.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderReportType = (type: any) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.reportTypeItem,
        { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border },
        reportType === type.id && { borderLeftColor: type.color, borderLeftWidth: 4 }
      ]}
      onPress={() => setReportType(type.id)}
    >
      <View style={styles.reportTypeLeft}>
        <Ionicons name={type.icon as any} size={24} color={type.color} />
        <View style={styles.reportTypeContent}>
          <Text style={[styles.reportTypeTitle, { color: currentTheme.colors.text }]}>{type.title}</Text>
          <Text style={[styles.reportTypeSubtitle, { color: currentTheme.colors.textSecondary }]}>{type.subtitle}</Text>
        </View>
      </View>
      <Ionicons 
        name={reportType === type.id ? "radio-button-on" : "radio-button-off"} 
        size={20} 
        color={reportType === type.id ? type.color : currentTheme.colors.textSecondary} 
      />
    </TouchableOpacity>
  );

  const renderSafetyResource = (resource: any) => (
    <TouchableOpacity
      key={resource.title}
      style={[styles.resourceItem, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}
      onPress={resource.action}
    >
      <View style={styles.resourceLeft}>
        <Ionicons name={resource.icon as any} size={24} color={resource.color} />
        <View style={styles.resourceContent}>
          <Text style={[styles.resourceTitle, { color: currentTheme.colors.text }]}>{resource.title}</Text>
          <Text style={[styles.resourceSubtitle, { color: currentTheme.colors.textSecondary }]}>{resource.subtitle}</Text>
        </View>
      </View>
      <Ionicons name="open-outline" size={20} color={currentTheme.colors.textSecondary} />
    </TouchableOpacity>
  );

  if (showReportForm) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
          <TouchableOpacity onPress={() => setShowReportForm(false)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Submit Report</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>What are you reporting?</Text>
            {reportTypes.map(renderReportType)}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Report Details</Text>
            
            <View style={[styles.inputSection, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>User ID or Username (Optional)</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                  value={reportedUserId}
                  onChangeText={setReportedUserId}
                  placeholder="Enter user ID or username"
                  placeholderTextColor={currentTheme.colors.textSecondary}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>User Display Name (Optional)</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                  value={reportedUserName}
                  onChangeText={setReportedUserName}
                  placeholder="Enter user's display name"
                  placeholderTextColor={currentTheme.colors.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>Description *</Text>
                <TextInput
                  style={[styles.textInput, styles.textAreaInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Please describe what happened in detail..."
                  placeholderTextColor={currentTheme.colors.textSecondary}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>Additional Evidence (Optional)</Text>
                <TextInput
                  style={[styles.textInput, styles.textAreaInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                  value={evidence}
                  onChangeText={setEvidence}
                  placeholder="Screenshots, messages, or other relevant information..."
                  placeholderTextColor={currentTheme.colors.textSecondary}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </View>

          <View style={[styles.disclaimerSection, { backgroundColor: currentTheme.colors.surface }]}>
            <Ionicons name="information-circle-outline" size={24} color={currentTheme.colors.primary} />
            <View style={styles.disclaimerContent}>
              <Text style={[styles.disclaimerTitle, { color: currentTheme.colors.text }]}>Report Information</Text>
              <Text style={[styles.disclaimerText, { color: currentTheme.colors.textSecondary }]}>
                • Reports are reviewed by our safety team within 24 hours{'\n'}
                • False reports may result in account restrictions{'\n'}
                • For immediate danger, contact emergency services{'\n'}
                • Your report will remain confidential
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={handleSubmitReport}
            disabled={isLoading || !reportType || !description.trim()}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Submitting Report...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Report & Safety</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.actionSection, { backgroundColor: currentTheme.colors.surface }]}>
          <TouchableOpacity
            style={[styles.primaryAction, { backgroundColor: '#FF5722' }]}
            onPress={() => setShowReportForm(true)}
          >
            <Ionicons name="flag" size={24} color="#fff" />
            <Text style={styles.primaryActionText}>Report a User or Issue</Text>
          </TouchableOpacity>
        </View>

        {activeReport && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Recent Report</Text>
            <View style={[styles.reportStatusCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.reportStatusHeader}>
                <Ionicons name="time-outline" size={20} color="#FF9800" />
                <Text style={[styles.reportStatusText, { color: currentTheme.colors.text }]}>Report Under Review</Text>
              </View>
              <Text style={[styles.reportStatusDescription, { color: currentTheme.colors.textSecondary }]}>
                Report type: {reportTypes.find(t => t.id === activeReport.type)?.title}
              </Text>
              <Text style={[styles.reportStatusDescription, { color: currentTheme.colors.textSecondary }]}>
                We'll notify you once the review is complete.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Safety Resources</Text>
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.textSecondary }]}>
            Get help when you need it most
          </Text>
          {safetyResources.map(renderSafetyResource)}
        </View>

        <View style={[styles.tipsSection, { backgroundColor: currentTheme.colors.surface }]}>
          <Text style={[styles.tipsTitle, { color: currentTheme.colors.text }]}>Safety Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={[styles.tipText, { color: currentTheme.colors.textSecondary }]}>
                Never share personal information like address or financial details
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={[styles.tipText, { color: currentTheme.colors.textSecondary }]}>
                Meet in public places for first dates
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={[styles.tipText, { color: currentTheme.colors.textSecondary }]}>
                Trust your instincts - block users who make you uncomfortable
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={[styles.tipText, { color: currentTheme.colors.textSecondary }]}>
                Report suspicious behavior immediately
              </Text>
            </View>
          </View>
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
  actionSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  primaryActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  reportTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 1,
  },
  reportTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportTypeContent: {
    marginLeft: 16,
    flex: 1,
  },
  reportTypeTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  reportTypeSubtitle: {
    fontSize: 14,
  },
  inputSection: {
    padding: 20,
    borderRadius: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textAreaInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  disclaimerSection: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  disclaimerContent: {
    marginLeft: 12,
    flex: 1,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reportStatusCard: {
    padding: 16,
    borderRadius: 8,
  },
  reportStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportStatusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reportStatusDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 1,
  },
  resourceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resourceContent: {
    marginLeft: 16,
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 14,
  },
  tipsSection: {
    padding: 20,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
}); 