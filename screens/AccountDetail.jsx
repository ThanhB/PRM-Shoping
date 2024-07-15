import React from "react";
import { View, Text } from "react-native";

function AccountDetail({ route }) {
  const { user } = route.params;

  const getFullName = (u) => {
    if (u.firstName && u.lastName && u.middleName)
      return `${u.lastName} ${u.middleName} ${u.firstName}`;

    return u.email.split("@")[0];
  };

  return (
    <View className="py-4 px-3">
      <Text className="font-bold text-black text-2xl">Account Infomation</Text>
      <View className="mt-10 px-2 space-y-9">
        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">User name</Text>
          <Text className="text-black">Name: {getFullName(user)}</Text>
        </View>

        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">Email</Text>
          <Text className="text-black">{user.email}</Text>
        </View>

        <View className="space-y-2">
          <Text className="font-bold text-black text-xl">Phone number</Text>
          <Text className="text-black">
            {user.phoneNumber ? user.phoneNumber : "N/A"}
          </Text>
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
