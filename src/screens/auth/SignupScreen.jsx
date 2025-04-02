// src/screens/auth/SignupScreen.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <Button 
        title="Go to Login" 
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SignupScreen;
