// app/(tabs)/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '@/src/types/navigation';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home</Text>
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default HomeScreen;
