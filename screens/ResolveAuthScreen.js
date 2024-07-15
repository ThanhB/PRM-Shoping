import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ResolveAuthScreen;
