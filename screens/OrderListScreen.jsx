import React, { useEffect, useState } from "react";
import { View, Text, Animated, Button, ScrollView } from "react-native";
import { useRoute, Link } from "@react-navigation/native";
import apiInstance from "../api";

function OrderListScreen() {
  const route = useRoute();
  const userId = route.params?.userId;
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
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

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await apiInstance.get(
        `/orders?limit=10&page=1&order=created%20asc&userId=${userId}`
      );
      const fetchedOrders = response.data.data ? response.data.data : [];
      setOrders(fetchedOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const displayedOrders = orders;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Text>Loading...</Text>
        </Animated.View>
      </View>
    );
  }

  const OrderCard = () => {
    if (
      !Array.isArray(displayedOrders.orders) ||
      displayedOrders.orders.length === 0
    ) {
      return <Text>No orders found.</Text>;
    }
    return displayedOrders.orders.map((order, index) => (
      <View
        key={index}
        className="m-2 p-4 border border-gray-200 bg-white h-[150px] rounded-lg shadow-md"
      >
        <View className="flex flex-col justify-between">
          <Text className="font-bold">Order № {order._id}</Text>
          <View className="flex flex-row justify-between mt-6">
            <Text>Quantity: {order.orderItems.length}</Text>
            <Text>
              Total Amount:
              <Text className=" text-red-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalPrice)}
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <View className="flex flex-row justify-between mt-6">
            <Link
              to={{
                screen: "Order Detail",
                params: {
                  orderId: order._id,
                  paymentId: order.paymentMethod,
                },
              }}
            >
              <View className="flex-col items-start justify-start w-24 h-9 pl-6 pt-1.5 pb-1.5 border border-black rounded-full">
                <Text className="text-center text-sm font-medium leading-5 text-black">
                  Details
                </Text>
              </View>
            </Link>
            <Text className="pt-2">
              {order.isDelivered === 0 ? (
                <Text className="text-red-500">Not Delivered</Text>
              ) : order.isDelivered === 1 ? (
                <Text className="text-green-500">Delivered</Text>
              ) : null}
            </Text>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView>
      <View className="py-5">
        <Text className="font-bold text-black text-2xl px-3 pb-6">
          My Orders
        </Text>
        {OrderCard()}
      </View>
    </ScrollView>
  );
}

export default OrderListScreen;
