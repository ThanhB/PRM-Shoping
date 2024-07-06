import { View, Text, Image } from "react-native";
import React from "react";

const SaleCard = ({title}) => {
  return (
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
        source={require("../assets/feature-img-1.jpg")}
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
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{color: 'white', fontSize: 16}}>{title.name}</Text>

      </View>
    </View>
  );
};

export default SaleCard;
