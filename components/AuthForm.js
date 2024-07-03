import React, { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const { state } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {errorMessage ? (
        <TextInput style={styles.errorMessage}>{errorMessage}</TextInput>
      ) : null}

      <TextInput
        className="border border-zinc-300 rounded-lg px-4 py-2 mt-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        className="border border-zinc-300 rounded-lg px-4 py-2 mt-4"
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        className="bg-green-600 rounded-lg px-4 py-3 mt-4"
        onPress={() => onSubmit({ email, password })}
        disabled={state.loading}
      >
        {state.loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-center">{submitButtonText}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
