import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View, Animated, Image, ActivityIndicator } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import apiInstance from "../api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "@react-navigation/native";
function ProfileScreen() {
  const { signout } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiInstance.get("/auth/me");
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const getFullName = (user) => {
    return `${user.lastName} ${user.middleName} ${user.firstName}`;
  };

  const fullName = getFullName(user);

  return (
    <View className="mt-24 px-4">
      <Text className="text-2xl text-black font-bold ">My Profile</Text>
      <View className="flex flex-row items-center space-x-5 mt-8">
        <Image
          source={{ uri: user.avatar }}
          className="w-[70px] h-[70px] rounded-full"
        />
        <View className="flex flex-col pb-2 text-black">
          <Text className="text-base">{fullName}</Text>
          <Text>{user.email}</Text>
        </View>
      </View>
      <View className="mt-10 space-y-4">
        <View class="order-list">
          <Link to={{ screen: "orderList", params: { userId: user._id } }}>
            <View className="bg-white w-full h-[60px] rounded-xl flex flex-row items-center justify-between px-2">
              <Text className="font-bold text-black pl-1 text-base">
                My orders
              </Text>
              <Icon name="chevron-right" size={24} />
            </View>
          </Link>
        </View>
        <View class="Account">
          <Link to={{ screen: "accountDetail", params: { user: user } }}>
            <View className="bg-white w-full h-[60px] rounded-xl flex flex-row items-center justify-between px-2">
              <Text className="font-bold text-black pl-1 text-base">
                Account
              </Text>
              <Icon name="chevron-right" size={24} />
            </View>
          </Link>
        </View>
      </View>
      <View className="mt-10">
        <Button title="Sign Out" onPress={signout} className="mt-5" />
      </View>
    </View>
  );
}

export default ProfileScreen;
