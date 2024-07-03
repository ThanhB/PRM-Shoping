import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <>
      <Text>ProfileScreen</Text>
      <Button title="Sign Out" onPress={signout} />
    </>
  );
};

export default ProfileScreen;
