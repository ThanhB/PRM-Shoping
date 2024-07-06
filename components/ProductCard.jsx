import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        borderRadius: 5,
        width: 150,
        height: 200,
        margin: 10,
        display: "flex",
        flexDirection: "column",
      }}
      onPress={() =>
        navigation.navigate("ProductDetail", { productTypeId: item._id })
      }
    >
      <View className="w-full h-2/3 ">
        <Image
          source={require("../assets/avatar.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 3,
          }}
        />
      </View>
      <View className="w-full h-1/3 py-2 px-3 flex flex-col gap-y-2">
        <Text className="font-bold text-base">{item.name}</Text>
        <Text className="font-semibold text-green-500">$100</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
