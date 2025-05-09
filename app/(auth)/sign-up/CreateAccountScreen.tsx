import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
// import { useRouter } from 'expo-router'; // No longer using Expo Router
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList, AuthStackParamList } from '@/src/types/navigation'; // Added AuthStackParamList
import { useUserSignup } from '@/src/context/UserSignupContext';
import { supabase } from '@/src/lib/supabase';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { authStyles } from '../authStyles';

// Define the navigation prop types
type CreateAccountScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CreateAccount'>;
// For navigating to Login which is in AuthStack, if needed, though AuthProvider should handle it.
// However, explicitly navigating after reset is cleaner.
type AppNavigationProp = StackNavigationProp<AuthStackParamList>; 

export default function CreateAccountScreen() {
  const navigation = useNavigation<CreateAccountScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>(); // For navigating to Login
  const { signupData, resetSignupData, updateSignupData } = useUserSignup(); // Added resetSignupData and updateSignupData
  const [email, setEmail] = useState(signupData.email || ''); // Prefer pre-fill if user went back and forth
  const [password, setPassword] = useState(signupData.password || '');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      setLoading(false);
      return;
    }

    const { name, phoneNumber, birthday } = signupData;
    if (!name || !phoneNumber || !birthday) {
        Alert.alert('Error', 'Missing registration data. Please go back and complete all steps.');
        setLoading(false);
        return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
          phone: phoneNumber,
          birthday: birthday,
        },
      },
    });

    setLoading(false); // Set loading to false after the call, regardless of outcome

    if (error) {
      Alert.alert('Registration Error', error.message);
      console.error('Supabase signUp error:', error);
    } else if (data.user) {
      Alert.alert(
        'Registration Successful',
        data.session ? 'You are now signed in!' : 'Please check your email to confirm your registration.',
        [
          { text: 'OK', onPress: () => {
              resetSignupData(); 
              // AuthProvider will handle redirect to Home if session exists.
              // If no session (email confirm), redirect to Login so user isn't stuck.
              if (!data.session) {
                appNavigation.navigate('Login');
              }
            }
          }
        ]
      );
    } else {
        Alert.alert('Registration Issue', 'An unknown issue occurred during registration.');
    }
  };

  const handleBack = () => {
    // Store current email/password in context in case user goes back then forward again
    updateSignupData({ email, password }); 
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: 'black' }} // backgroundColor to avoid white flashes
    >
      <ThemedView style={authStyles.container}> {/* justifyContent: space-between */}
        {/* Main content area */}
        <View style={styles.mainContent}>
          <ThemedText type="title" style={[authStyles.title, styles.headerAlignment]}>Create Account</ThemedText>
          <ThemedText style={[authStyles.subtitle, styles.subtitleAlignment]}>Enter your email and password.</ThemedText>

          <TextInput
            style={authStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
          <TextInput
            style={authStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>

        {/* Button group at the bottom */}
        {/* Conditional rendering for loading indicator vs buttons */}
        {loading ? (
          <View style={authStyles.buttonGroup}> {/* Ensure loading indicator is also at bottom if needed */}
            <ActivityIndicator size="large" color="#FFD700" />
          </View>
        ) : (
          <View style={authStyles.buttonGroup}>
            <TouchableOpacity style={authStyles.button} onPress={handleSignUp}>
              <Text style={authStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={authStyles.secondaryButton} onPress={handleBack}>
              <Text style={authStyles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1, // Take available space, allowing content to be centered or pushed up by KAV
    justifyContent: 'center',
  },
  headerAlignment: {
    textAlign: 'center',
    marginTop: 0, // Override authStyles.title.marginTop
    marginBottom: 10, // Space before subtitle
  },
  subtitleAlignment: {
    textAlign: 'center',
    alignSelf: 'center', // Ensure width: 80% from authStyles.subtitle works with textAlign:center
    marginBottom: 30, // Space before inputs
  }
}); 