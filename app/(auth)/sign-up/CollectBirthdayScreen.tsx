// app/(auth)/sign-up/CollectBirthdayScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, Platform } from 'react-native';
// import { useRouter } from 'expo-router'; // No longer using Expo Router here
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList } from '@/src/types/navigation';
import { useUserSignup } from '@/src/context/UserSignupContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { authStyles } from '../authStyles';
// You might need a date picker component or a different input strategy for birthday
// For now, using a simple TextInput

// Define the navigation prop type
type CollectBirthdayScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CollectBirthday'>;

export default function CollectBirthdayScreen() { // Renamed component
  const navigation = useNavigation<CollectBirthdayScreenNavigationProp>(); // Use @react-navigation
  const { signupData, updateSignupData } = useUserSignup();
  const [birthday, setBirthday] = useState(signupData.birthday || '');

  const handleNext = () => {
    if (!birthday.trim()) { // Add proper validation for date format later
      Alert.alert('Validation Error', 'Please enter your birthday.');
      return;
    }
    updateSignupData({ birthday });
    navigation.navigate('CreateAccount'); // Navigate to next screen in the stack
  };

  const handleBack = () => {
    navigation.goBack(); // Use @react-navigation goBack
  };

  return (
    <ThemedView style={authStyles.container}>
      {/* Main content area (title, input) */}
      <View style={styles.mainContent}> 
        <ThemedText type="title" style={[authStyles.title, styles.headerAlignment]}>What's your birthday?</ThemedText>
        <TextInput
          value={birthday}
          onChangeText={setBirthday}
          placeholder="MM/DD/YYYY"
          style={[authStyles.input, styles.inputField]}
          keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'} // Basic for now
          placeholderTextColor="#888"
        />
      </View>

      {/* Button group at the bottom */}
      <View style={authStyles.buttonGroup}>
        <TouchableOpacity style={authStyles.button} onPress={handleNext}>
          <Text style={authStyles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.secondaryButton} onPress={handleBack}>
          <Text style={authStyles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContent: { // Renamed from contentContainer
    flex: 1, // Allows content to take available space and center vertically
    justifyContent: 'center',
    // paddingHorizontal from authStyles.container is 30, so local 20 might be redundant or for finer control.
    // For now, relying on container's padding.
  },
  inputField: {
    marginTop: 20,
  },
  headerAlignment: { // Renamed from headerOffset
    textAlign: 'center',
    // marginBottom: 30, // Removed, authStyles.title has its own margins
    marginTop: 0, // Override authStyles.title.marginTop if it's too large for this centered layout
  },
}); 