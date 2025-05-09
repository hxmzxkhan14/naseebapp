// app/(auth)/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '@/src/types/navigation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmail } = useAuth();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password);
      // After successful login, AuthProvider will update the user state,
      // and App.tsx will automatically navigate to HomeScreen.
      console.log('[LoginScreen] Login attempt processed, awaiting auth state change.');
    } catch (error) {
      // signInWithEmail in AuthContext already logs errors.
      // You might want to set an error state here to display to the user.
      console.error('[LoginScreen] Error during login attempt:', error);
      // TODO: Add state to show login error to user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {/* TODO: Add error display here */}
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
        onPress={() => navigation.navigate("Register")}
        color="#444"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 5 },
});

export default LoginScreen;
