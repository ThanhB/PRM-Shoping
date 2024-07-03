import React, { useCallback, useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AuthForm from "../components/AuthForm";
import { Link, useFocusEffect } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex-row justify-around items-center mt-4">
        <Link to={{ screen: "Signin" }}>
          <Text className="text-lg font-bold text-green-600">Login</Text>
        </Link>
        <Link to={{ screen: "Signup" }}>
          <Text className="text-lg font-bold text-zinc-400">Register</Text>
        </Link>
      </View>
      <View className="border-b border-green-600 w-1/2 mt-2" />

      <Text className="text-2xl font-bold mt-8">Sign In</Text>
      <Text className="text-zinc-600 mt-2">
        Welcome back! Don’t have an account?{" "}
        <Link to={{ screen: "Signup" }}>
          <Text className="text-green-600">Sign Up</Text>
        </Link>
      </Text>

      <AuthForm
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />

      <View className="flex-row items-center mt-4">
        <TouchableOpacity className="ml-auto">
          <Text className="text-green-600">Forgot password?</Text>
        </TouchableOpacity>
      </View>

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
  );
};

export default SigninScreen;
