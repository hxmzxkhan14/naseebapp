// app/(auth)/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '@/src/types/navigation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail } = useAuth();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    try {
      setError(null);
      await signInWithEmail(email, password);
      console.log('[LoginScreen] Login attempt processed, awaiting auth state change.');
    } catch (err) {
      console.error('[LoginScreen] Error during login attempt:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("RegisterFlow")}
        color="#444"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 5 },
  errorText: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

export default LoginScreen;
