import React, { useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
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
    <View className="flex-1 bg-green-400 justify-center pt-10">
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <Link to={{ screen: "Signup" }}>
        Dont have an account? Sign up instead
      </Link>
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

export default SigninScreen;
