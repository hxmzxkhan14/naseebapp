// app/(auth)/sign-up/CollectNameScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList, RegistrationData } from '@/src/types/navigation';
import { useUserSignup } from '@/src/context/UserSignupContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { authStyles } from '../authStyles';

// Define the navigation prop type for this screen
type CollectNameScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CollectName'>;

export default function CollectNameScreen() {
  const navigation = useNavigation<CollectNameScreenNavigationProp>();
  const { signupData, updateSignupData } = useUserSignup();
  const [name, setName] = useState(signupData.name || '');

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }
    updateSignupData({ name });
    navigation.navigate('CollectPhoneNumber');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ThemedView style={authStyles.container}> 
      {/* Main content area */}
      <View style={styles.mainContent}>
        <ThemedText type="title" style={[authStyles.title, styles.headerAlignment]}>What's your name?</ThemedText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          style={[authStyles.input, {marginTop: 20}]} 
          autoCapitalize="words"
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
  mainContent: {
    flex: 1, // Allows content to take available space and center vertically if needed
    justifyContent: 'center', // Center content vertically
    // paddingHorizontal is on authStyles.container
  },
  headerAlignment: { // Replaces headerOffset, to be used with authStyles.title
    textAlign: 'center',
    // marginBottom is on authStyles.name_header, or can be added here if needed
    // marginTop on authStyles.title might push it down too much if mainContent is centered.
    // authStyles.title has marginTop: 100, which is quite large for a centered element.
    // We might need to adjust marginTop on authStyles.title or override it here.
    marginTop: 0, // Override authStyles.title.marginTop if it's too large for this layout
  },
}); 