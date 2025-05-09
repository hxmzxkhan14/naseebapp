// app/(auth)/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '@/src/types/navigation';
import { supabase } from '@/src/lib/supabase'; // Ensure this path is correct

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleRegister = async () => {
    try {
      setError(null);
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) throw signUpError;
      
      // After successful registration, AuthProvider will update the user state,
      // and App.tsx will automatically navigate to HomeScreen.
      console.log('[RegisterScreen] Registration successful, awaiting auth state change.');
    } catch (error) {
      console.error('[RegisterScreen] Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
        color="#444"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 5 },
  errorText: { color: 'red', marginBottom: 10, textAlign: 'center' }, // Renamed from 'error' to 'errorText'
});

export default RegisterScreen;
