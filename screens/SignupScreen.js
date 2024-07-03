import { Link, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
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
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <Link to={{ screen: "Signin" }}>
        Already have an account? Sign in instead!
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

export default SignupScreen;
