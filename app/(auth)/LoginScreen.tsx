// app/(auth)/LoginScreen.tsx
import React from 'react';
import { View, Pressable } from 'react-native'; // Removed StyleSheet as it was unused
// import { useRouter } from 'expo-router'; // No longer using Expo Router here
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@/src/types/navigation'; // For typing the navigation prop
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { authStyles } from '@/app/(auth)/authStyles';
import { supabase } from '@/src/lib/supabase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import HomeScreen from '../(tabs)/HomeScreen';
import TabsNavigator from '../(tabs)/TabsNavigator';

// Define the navigation prop type for this screen, assuming it's part of AuthStackParamList
type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Use @react-navigation
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;

      // navigate to main app
      if (data) navigation.reset({ index: 0, routes: [{name: TabsNavigator }]});
    } catch (error) {
      console.error('Login error')
    }
  }

  return (
    <ThemedView style={authStyles.container}>
      <View>
        <ThemedText type="title" style={authStyles.title}>
          Welcome to Naseeb
        </ThemedText>
        <ThemedText style={authStyles.subtitle}>
          A better way to find meaningful connections.
        </ThemedText>
      </View>

      <View style={authStyles.buttonGroup}>
        {/* Continue with Phone Button */}
        <Pressable
          onPress={() => navigation.navigate('RegisterFlow', { screen: 'CollectPhoneNumber' })} 
          style={({ pressed }) => [
            authStyles.button,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <View style={authStyles.oauthContent}>
            <Ionicons name="call" size={20} color="black" style={authStyles.icon} />
            <ThemedText style={authStyles.buttonText}>Continue with Phone</ThemedText>
          </View>
        </Pressable>

        {/* Create an Account Button (was Sign up with Email) */}
        <Pressable
          onPress={() => navigation.navigate('RegisterFlow')} // Starts RegisterFlow at CollectNameScreen
          style={({ pressed }) => [
            authStyles.button, 
            { opacity: pressed ? 0.6 : 1, marginTop: 10 }, 
          ]}
        >
          <View style={authStyles.oauthContent}> 
            <Ionicons name="create-outline" size={20} color="black" style={authStyles.icon} />
            <ThemedText style={authStyles.buttonText}>Create an Account</ThemedText>
          </View>
        </Pressable>

        {/* Google */}
        <Pressable
          onPress={handleGoogleLogin} // Placeholder
          style={({ pressed }) => [
            authStyles.oauthButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <View style={authStyles.oauthContent}>
            <FontAwesome name="google" size={20} color="#DB4437" style={authStyles.icon} />
            <ThemedText style={authStyles.oauthText}>Continue with Google</ThemedText>
          </View>
        </Pressable>

        {/* Facebook */}
        <Pressable
          onPress={() => console.log('Facebook OAuth button pressed')} // Placeholder
          style={({ pressed }) => [
            authStyles.oauthButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <View style={authStyles.oauthContent}>
            <FontAwesome name="facebook" size={20} color="#3b5998" style={authStyles.icon} />
            <ThemedText style={authStyles.oauthText}>Continue with Facebook</ThemedText>
          </View>
        </Pressable>
      </View>
    </ThemedView>
  );
}

// Note: Original LoginScreen styles are removed as authStyles is now used.
// If any specific styles were needed from the old LoginScreen that are not in authStyles,
// they would need to be merged or added here.
