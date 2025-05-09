// app/(auth)/sign-up/CollectPhoneNumberScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList, RegistrationData } from '@/src/types/navigation';
import { useRegistration } from '@/src/context/RegistrationContext';

type CollectPhoneNumberScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CollectPhoneNumber'>;

const CollectPhoneNumberScreen = () => {
  const navigation = useNavigation<CollectPhoneNumberScreenNavigationProp>();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [phoneNumber, setPhoneNumber] = useState(registrationData.phoneNumber || '');

  const handleNext = () => {
    // Basic validation (can be improved)
    if (!phoneNumber.trim() || !/^[+]?[\d\s-]{7,15}$/.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return;
    }
    updateRegistrationData({ phoneNumber });
    navigation.navigate('CollectBirthday'); // Navigate to the next step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your phone number?</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number (e.g., +1234567890)"
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Button title="Next" onPress={handleNext} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, borderRadius: 5 },
});

export default CollectPhoneNumberScreen; 