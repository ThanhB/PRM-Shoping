import { Link, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  return (
    <View className="flex-1 bg-white p-4 pt-8">
      <ScrollView>
        <View className="flex-row justify-around items-center mt-4">
          <Link to={{ screen: "Signin" }}>
            <Text className="text-lg font-bold text-zinc-400">Login</Text>
          </Link>
          <Link to={{ screen: "Signup" }}>
            <Text className="text-lg font-bold text-green-600">Register</Text>
          </Link>
        </View>
        <View className="border-b border-green-600 w-1/2 mt-2 ml-auto" />

        <Text className="text-2xl font-bold mt-8">Sign Up</Text>
        <Text className="text-zinc-600 mt-2">
          Already have an account?{" "}
          <Link to={{ screen: "Signin" }}>
            <Text className="text-green-600">Sign in instead!</Text>
          </Link>
        </Text>

        <AuthForm
          errorMessage={state.errorMessage}
          submitButtonText="Sign Up"
          onSubmit={signup}
        />

        <View className="flex-row items-center mt-4">
          <View className="flex-1 border-b border-zinc-300" />
          <Text className="mx-4 text-zinc-400">OR</Text>
          <View className="flex-1 border-b border-zinc-300" />
        </View>

        <TouchableOpacity className="flex-row items-center border border-zinc-300 rounded-lg px-4 py-2 mt-4">
          <Text className="text-lg">🌐</Text>
          <Text className="ml-4">Log In with Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignupScreen;
