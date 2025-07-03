import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface TwoFactorSettings {
  isEnabled: boolean;
  method: 'sms' | 'email' | 'authenticator';
  phoneNumber: string;
  email: string;
  backupCodes: string[];
  lastEnabledDate: Date | null;
}

export default function TwoFactorAuthScreen() {
  const router = useRouter();
  const { currentTheme } = useTheme();
  
  // Backend-ready state management
  const [settings, setSettings] = useState<TwoFactorSettings>({
    isEnabled: false,
    method: 'sms',
    phoneNumber: '+1 (555) 123-4567',
    email: 'user@example.com',
    backupCodes: [],
    lastEnabledDate: null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  // Simulate backend API calls
  const handleToggle2FA = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (enabled) {
        // When enabling, generate backup codes
        const codes = generateBackupCodes();
        setSettings(prev => ({
          ...prev,
          isEnabled: true,
          backupCodes: codes,
          lastEnabledDate: new Date(),
        }));
        setShowBackupCodes(true);
        Alert.alert('2FA Enabled', 'Two-factor authentication has been enabled. Please save your backup codes.');
      } else {
        setSettings(prev => ({
          ...prev,
          isEnabled: false,
          backupCodes: [],
          lastEnabledDate: null,
        }));
        Alert.alert('2FA Disabled', 'Two-factor authentication has been disabled.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update 2FA settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateBackupCodes = (): string[] => {
    return Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
  };

  const handleMethodChange = (method: 'sms' | 'email' | 'authenticator') => {
    setSettings(prev => ({ ...prev, method }));
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setSettings(prev => ({ ...prev, phoneNumber }));
  };

  const handleEmailChange = (email: string) => {
    setSettings(prev => ({ ...prev, email }));
  };

  const sendTestCode = async () => {
    setIsLoading(true);
    try {
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Test Code Sent', `A test verification code has been sent to your ${settings.method === 'sms' ? 'phone' : 'email'}.`);
    } catch (error) {
      Alert.alert('Error', 'Failed to send test code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const authMethods = [
    {
      id: 'sms' as const,
      title: 'SMS Text Message',
      subtitle: 'Receive codes via text message',
      icon: 'chatbubble-outline',
    },
    {
      id: 'email' as const,
      title: 'Email',
      subtitle: 'Receive codes via email',
      icon: 'mail-outline',
    },
    {
      id: 'authenticator' as const,
      title: 'Authenticator App',
      subtitle: 'Use Google Authenticator or similar app',
      icon: 'shield-checkmark-outline',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Two-Factor Authentication</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.statusSection, { backgroundColor: currentTheme.colors.surface }]}>
          <View style={styles.statusHeader}>
            <Ionicons 
              name={settings.isEnabled ? "shield-checkmark" : "shield-outline"} 
              size={32} 
              color={settings.isEnabled ? '#4CAF50' : currentTheme.colors.textSecondary} 
            />
            <View style={styles.statusInfo}>
              <Text style={[styles.statusTitle, { color: currentTheme.colors.text }]}>
                {settings.isEnabled ? '2FA Enabled' : '2FA Disabled'}
              </Text>
              <Text style={[styles.statusSubtitle, { color: currentTheme.colors.textSecondary }]}>
                {settings.isEnabled 
                  ? `Enabled on ${settings.lastEnabledDate?.toLocaleDateString()}`
                  : 'Add an extra layer of security to your account'
                }
              </Text>
            </View>
          </View>
          <Switch
            value={settings.isEnabled}
            onValueChange={handleToggle2FA}
            disabled={isLoading}
            trackColor={{ false: currentTheme.colors.border, true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>

        {settings.isEnabled && (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Authentication Method</Text>
              {authMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodItem,
                    { backgroundColor: currentTheme.colors.surface, borderBottomColor: currentTheme.colors.border },
                    settings.method === method.id && { borderLeftColor: currentTheme.colors.primary, borderLeftWidth: 4 }
                  ]}
                  onPress={() => handleMethodChange(method.id)}
                >
                  <View style={styles.methodLeft}>
                    <Ionicons name={method.icon as any} size={24} color={currentTheme.colors.primary} />
                    <View style={styles.methodContent}>
                      <Text style={[styles.methodTitle, { color: currentTheme.colors.text }]}>{method.title}</Text>
                      <Text style={[styles.methodSubtitle, { color: currentTheme.colors.textSecondary }]}>{method.subtitle}</Text>
                    </View>
                  </View>
                  <Ionicons 
                    name={settings.method === method.id ? "radio-button-on" : "radio-button-off"} 
                    size={20} 
                    color={settings.method === method.id ? currentTheme.colors.primary : currentTheme.colors.textSecondary} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Contact Information</Text>
              <View style={[styles.inputSection, { backgroundColor: currentTheme.colors.surface }]}>
                {settings.method === 'sms' && (
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>Phone Number</Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                      value={settings.phoneNumber}
                      onChangeText={handlePhoneNumberChange}
                      placeholder="Enter phone number"
                      placeholderTextColor={currentTheme.colors.textSecondary}
                      keyboardType="phone-pad"
                    />
                  </View>
                )}
                
                {settings.method === 'email' && (
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: currentTheme.colors.text }]}>Email Address</Text>
                    <TextInput
                      style={[styles.textInput, { backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text, borderColor: currentTheme.colors.border }]}
                      value={settings.email}
                      onChangeText={handleEmailChange}
                      placeholder="Enter email address"
                      placeholderTextColor={currentTheme.colors.textSecondary}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                )}

                {settings.method === 'authenticator' && (
                  <View style={styles.qrSection}>
                    <Text style={[styles.qrTitle, { color: currentTheme.colors.text }]}>Setup Authenticator App</Text>
                    <Text style={[styles.qrSubtitle, { color: currentTheme.colors.textSecondary }]}>
                      Scan this QR code with your authenticator app
                    </Text>
                    <View style={[styles.qrPlaceholder, { backgroundColor: currentTheme.colors.border }]}>
                      <Ionicons name="qr-code" size={80} color={currentTheme.colors.textSecondary} />
                    </View>
                  </View>
                )}

                <TouchableOpacity 
                  style={[styles.testButton, { backgroundColor: currentTheme.colors.primary }]}
                  onPress={sendTestCode}
                  disabled={isLoading}
                >
                  <Text style={styles.testButtonText}>
                    {isLoading ? 'Sending...' : 'Send Test Code'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {settings.backupCodes.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Backup Codes</Text>
                <View style={[styles.backupSection, { backgroundColor: currentTheme.colors.surface }]}>
                  <View style={styles.backupHeader}>
                    <Ionicons name="key-outline" size={24} color={currentTheme.colors.primary} />
                    <View style={styles.backupInfo}>
                      <Text style={[styles.backupTitle, { color: currentTheme.colors.text }]}>Emergency Backup Codes</Text>
                      <Text style={[styles.backupSubtitle, { color: currentTheme.colors.textSecondary }]}>
                        Use these if you lose access to your 2FA method
                      </Text>
                    </View>
                  </View>
                  
                  {showBackupCodes && (
                    <View style={styles.codesGrid}>
                      {settings.backupCodes.map((code, index) => (
                        <View key={index} style={[styles.codeItem, { backgroundColor: currentTheme.colors.background }]}>
                          <Text style={[styles.codeText, { color: currentTheme.colors.text }]}>{code}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  <View style={styles.backupActions}>
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: currentTheme.colors.background }]}
                      onPress={() => setShowBackupCodes(!showBackupCodes)}
                    >
                      <Text style={[styles.actionButtonText, { color: currentTheme.colors.primary }]}>
                        {showBackupCodes ? 'Hide Codes' : 'Show Codes'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
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
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 1,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodContent: {
    marginLeft: 16,
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  methodSubtitle: {
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
  qrSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  testButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backupSection: {
    padding: 20,
    borderRadius: 12,
  },
  backupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backupInfo: {
    marginLeft: 16,
    flex: 1,
  },
  backupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  backupSubtitle: {
    fontSize: 14,
  },
  codesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  codeItem: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  codeText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  backupActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 