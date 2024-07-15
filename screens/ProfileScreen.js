import React, { useContext } from "react";
import { Button, Text, View, Image } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "@react-navigation/native";

function ProfileScreen() {
  const {
    signout,
    state: { user },
  } = useContext(AuthContext);

  const getFullName = (u) => {
    if (u.firstName && u.lastName && u.middleName)
      return `${u.lastName} ${u.middleName} ${u.firstName}`;

    return u.email.split("@")[0];
  };

  return (
    <View className="mt-24 px-4">
      <Text className="text-2xl text-black font-bold ">My Profile</Text>
      <View className="flex flex-row items-center space-x-5 mt-8">
        <Image
          source={{ uri: user.avatar }}
          className="w-[70px] h-[70px] rounded-full bg-gray-300"
        />
        <View className="flex flex-col pb-2 text-black">
          <Text className="text-base">{getFullName(user)}</Text>
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
