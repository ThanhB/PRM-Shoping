import React from "react";
import { View, Text } from "react-native";

function AccountDetail({ route }) {
  const { user } = route.params;

  const getFullName = () => {
    return `${user.lastName} ${user.middleName} ${user.firstName}`;
  };

  const fullName = getFullName(user);
  console.log("phone:", user.phoneNumber);
  return (
    <View className="py-4 px-3">
      <Text className="font-bold text-black text-2xl">Account Infomation</Text>
      <View className="mt-10 px-2 space-y-9">

        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">User name</Text>
          <Text className="text-black">Name: {fullName}</Text>
        </View>

        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">Email</Text>
          <Text className="text-black">{user.email}</Text>
        </View>

        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">Phone number</Text>
          <Text className="text-black">{user.phoneNumber ? user.phoneNumber : "N/A"}</Text>
        </View>

        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">Password</Text>
          <Text className="text-black">***********************</Text>
        </View>
      </View>
    </View>
  );
}
export default AccountDetail;
