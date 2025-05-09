// app/(auth)/sign-up/CollectNameScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList, RegistrationData } from '@/src/types/navigation';
import { useRegistration } from '@/src/context/RegistrationContext';

type CollectNameScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CollectName'>;

const CollectNameScreen = () => {
  const navigation = useNavigation<CollectNameScreenNavigationProp>();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [name, setName] = useState(registrationData.name || '');

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }
    updateRegistrationData({ name });
    navigation.navigate('CollectPhoneNumber'); // Navigate to the next step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your name?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        style={styles.input}
        autoCapitalize="words"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, borderRadius: 5 },
});

export default CollectNameScreen; 