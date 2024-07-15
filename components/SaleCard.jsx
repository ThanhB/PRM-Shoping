import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";

const SaleCard = ({ item }) => {
  return (
    <Link
      to={{
        screen: "Products",
        params: {
          screen: "ProductList",
          params: { categoryId: item.categoryId },
        },
      }}
      style={{ marginRight: 10 }}
    >
      <View
        style={{
          height: 150,
          width: 150,
          borderRadius: 10,
          marginRight: 10,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-full object-cover rounded-[10px]"
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            height: 40,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>{item.name}</Text>
        </View>
      </View>
    </Link>
  );
};

export default SaleCard;
