import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FeatureCard from "../components/FeatureCard";
import SaleCard from "../components/SaleCard";
import { useSelector } from "react-redux";
import React, { useContext, useEffect } from "react";
import { Alert } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const Category = [
    { id: 1, name: "Teddy" },
    { id: 2, name: "Car" },
  ];

  const SaleOffData = [
    { id: 1, name: "Phone" },
    { id: 2, name: "Table" },
    { id: 3, name: "Watch" },
    { id: 4, name: "Acessories" },
    { id: 5, name: "Headphone" },
  ];
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (cart.length > 0) {
      Alert.alert(
        "Notification",
        `You have ${cart.length} item(s) in your bag`
      );
    }
  }, [cart.length]);

  return (
    <ScrollView className=" bg-white py-2">
      {/* Avatar section */}

      <View className="flex px-4 justify-between items-center flex-row flex-1">
        <View className="flex flex-col">
          <Text>Welcome back!</Text>
          <Text className="text-base font-semibold">{user.email}</Text>
        </View>

        <View className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            source={{ uri: user.avatar }}
            className="w-full h-full object-cover bg-gray-300"
          />
        </View>
      </View>

      {/* Banner Section */}
      <View style={{ flex: 1, marginTop: 20, height: 180 }}>
        <Image
          source={require("../assets/carousel-banner-2.jpg")}
          className="h-full w-full object-cover"
        />
      </View>

      {/* Feature Section */}
      <View style={{ flex: 1, marginTop: 10, marginStart: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Category}
          renderItem={({ item }) => <FeatureCard />}
        />
      </View>

      {/* Shocking sale */}
      <View
        style={{
          flex: 1,
          height: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          marginTop: 32,
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 20 }}>Our Product</Text>
        <Text style={{ fontWeight: 400, fontSize: 16, color: "#0DA54B" }}>
          View all
        </Text>
      </View>

      {/* Product Section */}
      <View style={{ flex: 1, marginTop: 10, marginStart: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SaleOffData}
          renderItem={({ item }) => <SaleCard title={item} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
