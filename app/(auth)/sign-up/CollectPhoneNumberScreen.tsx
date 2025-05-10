// app/(auth)/sign-up/CollectPhoneNumberScreen.tsx
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
// import { useRouter } from 'expo-router'; // No longer using Expo Router here
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList } from '@/src/types/navigation'; 
import { useUserSignup } from '@/src/context/UserSignupContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { authStyles } from '@/app/(auth)/authStyles';

// Define the navigation prop type
type CollectPhoneNumberScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CollectPhoneNumber'>;

export default function CollectPhoneNumberScreen() { // Renamed component
  const navigation = useNavigation<CollectPhoneNumberScreenNavigationProp>(); // Use @react-navigation
  const { signupData, updateSignupData } = useUserSignup();
  const [phoneParts, setPhoneParts] = useState(['', '', '']); // For (XXX) XXX-XXXX
  const part1Ref = useRef<TextInput>(null);
  const part2Ref = useRef<TextInput>(null);
  const part3Ref = useRef<TextInput>(null);

  const handleNext = () => {
    const phoneNumber = `(${phoneParts[0]}) ${phoneParts[1]}-${phoneParts[2]}`;
    if (phoneParts[0].length !== 3 || phoneParts[1].length !== 3 || phoneParts[2].length !== 4) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    updateSignupData({ phoneNumber });
    navigation.navigate('CollectBirthday'); // Navigate to next screen in the stack
  };

  const handleBack = () => {
    navigation.goBack(); // Use @react-navigation goBack
  };

  const handleChangeText = (text: string, partIndex: number) => {
    const newPhoneParts = [...phoneParts];
    newPhoneParts[partIndex] = text.replace(/[^0-9]/g, ''); // Allow only numbers

    setPhoneParts(newPhoneParts);

    // Auto-focus next part
    if (partIndex === 0 && newPhoneParts[partIndex].length === 3) {
      part2Ref.current?.focus();
    } else if (partIndex === 1 && newPhoneParts[partIndex].length === 3) {
      part3Ref.current?.focus();
    }
  };

  return (
    <ThemedView style={authStyles.container}>
      <View style={styles.contentArea}>
        <ThemedText type="title" style={[authStyles.title, styles.headerOffset]}>What's your phone number?</ThemedText>
        <ThemedText style={[authStyles.subtitle, styles.subHeaderOffset]}>We'll text you a code to verify.</ThemedText>
        
        <View style={styles.phoneInputContainer}>
          <Text style={styles.fixedText}>(</Text>
          <TextInput
            ref={part1Ref}
            style={styles.input}
            value={phoneParts[0]}
            onChangeText={(text) => handleChangeText(text, 0)}
            keyboardType="number-pad"
            maxLength={3}
            placeholder="XXX"
            placeholderTextColor="#c3bcba"
          />
          <Text style={styles.fixedText}>)</Text>
          <TextInput
            ref={part2Ref}
            style={styles.input}
            value={phoneParts[1]}
            onChangeText={(text) => handleChangeText(text, 1)}
            keyboardType="number-pad"
            maxLength={3}
            placeholder="XXX"
            placeholderTextColor="#c3bcba"
          />
          <Text style={styles.fixedText}>-</Text>
          <TextInput
            ref={part3Ref}
            style={styles.input}
            value={phoneParts[2]}
            onChangeText={(text) => handleChangeText(text, 2)}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="XXXX"
            placeholderTextColor="#c3bcba"
          />
        </View>
      </View>
      
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
  contentArea: {
    // This view ensures that the main content (title, subtitle, input) 
    // is grouped together and `justifyContent: 'space-between'` on parent can push button group to bottom.
    // It doesn't need flex: 1 if the parent ThemedView is handling the overall flex distribution.
    // If content needs to be centered, add justifyContent: 'center' and flex:1 here,
    // but then buttonGroup must be outside this for space-between to work on parent.
    // For now, let content flow from top based on its own margins and parent padding.
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 8,
    minWidth: 50, 
  },
  fixedText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 2,
  },
  headerOffset: {
    // marginTop: 40, // This might be too much if not starting from very top of screen
    // authStyles.title already has marginTop: 100. This combined with container padding might be enough.
    // If authStyles.container.paddingVertical is 60, and title.marginTop is 100, it's already 160 from top.
    // Let's rely on authStyles.title.marginTop and container padding for now.
  },
  subHeaderOffset: {
    // marginTop: 10, // Spacing from title
  }
}); 