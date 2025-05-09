import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList, AuthStackParamList } from '@/src/types/navigation'; // Ensure AuthStackParamList is imported if navigating to Login
import { supabase } from '@/src/lib/supabase';
import { useRegistration } from '@/src/context/RegistrationContext';

// Navigation prop for this screen, within the RegistrationStack
// If navigating outside (e.g. to Login), composite navigation might be needed or careful type assertion.
type CreateAccountScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CreateAccount'>;
// For navigating to Login which is in AuthStack
type AppNavigationProp = StackNavigationProp<AuthStackParamList>; 

const CreateAccountScreen = () => {
  const navigation = useNavigation<CreateAccountScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>();
  const { registrationData, updateRegistrationData, resetRegistrationData } = useRegistration();

  const [email, setEmail] = useState(registrationData.email || '');
  const [password, setPassword] = useState(registrationData.password || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill if already in context (e.g., user went back and forth)
    if (registrationData.email) setEmail(registrationData.email);
    if (registrationData.password) setPassword(registrationData.password); // Less common to pre-fill password
  }, [registrationData]);

  const handleRegister = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }
    updateRegistrationData({ email, password });

    try {
      console.log('[CreateAccountScreen] Attempting to sign up with:', { ...registrationData, email, password });
      const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password, // Supabase handles password length requirements
        options: {
          data: { // Optional: pass other collected data to be stored in auth.users.user_metadata or public.users table if you have triggers
            full_name: registrationData.name, // Example: ensure your Supabase table/metadata can handle this
            phone: registrationData.phoneNumber,
            birthday: registrationData.birthday,
          },
        },
      });

      if (signUpError) {
        console.error('[CreateAccountScreen] Supabase signUp Error:', signUpError.message);
        throw signUpError;
      }
      
      console.log('[CreateAccountScreen] Registration successful. User:', user, 'Session:', session);
      Alert.alert(
        'Registration Successful',
        'Please check your email to confirm your account if email confirmation is enabled.',
        [{ text: 'OK', onPress: () => {
            resetRegistrationData(); // Clear registration form data
            // AuthProvider will handle navigation to Home after successful sign-up and session update.
            // Or, if email confirmation is required, user might stay on Login or a specific confirmation pending screen.
            // For now, we assume AuthProvider takes over or user is directed to login.
            appNavigation.navigate('Login'); // Navigate to Login after sign up
        }}]
      );

    } catch (err) {
      console.error('[CreateAccountScreen] HandleRegister Error:', err);
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during registration.';
      setError(message);
      Alert.alert('Registration Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.infoText}>Name: {registrationData.name}</Text>
      <Text style={styles.infoText}>Phone: {registrationData.phoneNumber}</Text>
      <Text style={styles.infoText}>Birthday: {registrationData.birthday}</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          updateRegistrationData({ email: text }); // Update context as user types
        }}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          updateRegistrationData({ password: text }); // Update context as user types
        }}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Complete Registration" onPress={handleRegister} />
      <Button title="Back" onPress={() => navigation.goBack()} />
      {/* Consider if navigating to Login directly from here is needed, or if it should be via AuthStack post-success */}
      {/* <Button title="Go to Login" onPress={() => appNavigation.navigate('Login')} color="#444" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 10, textAlign: 'center' },
  infoText: { fontSize: 16, marginBottom: 5, textAlign: 'center', color: '#555' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 15, borderRadius: 5 },
  errorText: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

export default CreateAccountScreen; 