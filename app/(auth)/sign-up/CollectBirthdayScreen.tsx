// app/(auth)/sign-up/CollectBirthdayScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationStackParamList, RegistrationData } from '@/src/types/navigation';
import { useRegistration } from '@/src/context/RegistrationContext';
// For a better UX, consider using a DateTimePicker component
// import DateTimePicker from '@react-native-community/datetimepicker';

type CollectBirthdayScreenNavigationProp = StackNavigationProp<RegistrationStackParamList, 'CollectBirthday'>;

const CollectBirthdayScreen = () => {
  const navigation = useNavigation<CollectBirthdayScreenNavigationProp>();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [birthday, setBirthday] = useState(registrationData.birthday || '');
  // const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNext = () => {
    // Basic validation (e.g., YYYY-MM-DD format, can be improved)
    if (!birthday.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
      Alert.alert('Validation Error', 'Please enter your birthday in YYYY-MM-DD format.');
      return;
    }
    updateRegistrationData({ birthday });
    navigation.navigate('CreateAccount'); // Navigate to the final step
  };

  // const onChangeDate = (event: any, selectedDate?: Date) => {
  //   setShowDatePicker(Platform.OS === 'ios');
  //   if (selectedDate) {
  //     setBirthday(selectedDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>When's your birthday?</Text>
      {/* 
      {Platform.OS === 'android' && (
        <Button onPress={() => setShowDatePicker(true)} title="Select Date" />
      )}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday ? new Date(birthday) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}
      {Platform.OS === 'ios' && showDatePicker && (
        <Button title="Done" onPress={() => setShowDatePicker(false)} />
      )}
      <Text style={styles.selectedDateText}>Selected: {birthday || 'YYYY-MM-DD'}</Text>
      // TextInput as a fallback or primary input method
      */} 
      <TextInput
        value={birthday}
        onChangeText={setBirthday}
        placeholder="YYYY-MM-DD"
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
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
  selectedDateText: { textAlign: 'center', marginVertical: 10, fontSize: 16 },
});

export default CollectBirthdayScreen; 