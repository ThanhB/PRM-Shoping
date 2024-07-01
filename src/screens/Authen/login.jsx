import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from "../../api/authen.js";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (isLoggingIn) {
      return;
    }
    setIsLoggingIn(true);
    try {
      const res = await login(email, password);
      if (res && res.status === 200 && res.data.accessToken) {
        Alert.alert("Login Successful", "You have successfully logged in.");
        const jwtToken = res.data.accessToken.split(" ")[1]; // Assuming the token is prefixed with 'Bearer '
        await AsyncStorage.setItem("__token", jwtToken);
        // Navigate to your next screen or update state to indicate successful login here
      } else {
        // Handle login failure due to other reasons here
        Alert.alert("Login Failed", "Unexpected response from server.");
      }
    } catch (err) {
      Alert.alert("Login Failed", "Username or password is invalid. Please try again.");
      console.error("Error during login:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={isLoggingIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;