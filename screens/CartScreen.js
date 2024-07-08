import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);

  const navigation = useNavigation();
  return (
    <ScrollView style={{ marginTop: 80, flex: 1 }}>
      <Text className="text-black font-bold text-4xl px-3">My Bag</Text>
      <View style={{ marginHorizontal: 10, marginTop: 50 }}>
        {cart?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 4,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderRadius: 10,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 2,
                flexDirection: "row",
                height: 100,
              }}
            >
              <View>
                <Image
                  style={{ width: 120, height: 100, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View className="ml-5">
                <Text numberOfLines={3} style={{ width: 220, marginTop: 10 }}>
                  {item?.name}
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", marginTop: 8 }}
                >
                  price:{" "}
                  <Text className=" text-red-500">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item?.price)}
                  </Text>
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                <Pressable
                  onPress={
                    item.quantity > 1 ? () => decreaseQuantity(item) : null
                  }
                  style={{
                    backgroundColor: "#ffff",
                    padding: 7,
                    borderRadius: 9999,
                    opacity: item.quantity > 1 ? 1 : 0.5, // disable button when quantity is 1
                  }}
                >
                  <AntDesign name="minus" size={24} color="black" />
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: "#ffff",
                    padding: 7,
                    borderRadius: 9999,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderWidth: 0.6,
                }}
              >
                <Text className="text-black">Delete</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Total : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
          {formattedTotal}
        </Text>
      </View>
      <View className="">
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        />
        <Pressable
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text>Proceed to Buy ({cart.length}) items</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CartScreen;
