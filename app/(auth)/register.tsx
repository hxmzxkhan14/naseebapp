import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, RegisterFormData } from '@/utils/validation';
import { lightTheme } from '@/constants/theme';

export default function RegisterScreen() {
  const { register, isRegistering, registerError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
    } catch (error) {
      Alert.alert('Registration Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Naseeb and start your journey</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
                autoCapitalize="words"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          {registerError && (
            <Text style={styles.errorText}>
              {registerError instanceof Error ? registerError.message : 'Registration failed'}
            </Text>
          )}

          <Button
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isRegistering}
            disabled={isRegistering}
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <Text style={styles.linkText}>Sign In</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: lightTheme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: lightTheme.spacing.xl * 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: lightTheme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: lightTheme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: lightTheme.spacing.lg,
  },
  footerText: {
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
  },
  linkText: {
    fontSize: 14,
    color: lightTheme.colors.primary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: lightTheme.colors.error,
    textAlign: 'center',
    marginTop: lightTheme.spacing.sm,
  },
}); 