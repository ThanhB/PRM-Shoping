import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Animated, Image, ActivityIndicator } from "react-native";
import apiInstance from "../api";

function OrderDetail() {
  const route = useRoute();
  const orderId = route.params?.orderId;
  const paymentId = route.params?.paymentId;
  const [orderDetail, setOrderDetail] = useState({});
  const [payment, setPayment] = useState({});
  const [delivery, setDelivery] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const fetchDeliveryInfo = async (deliveryId) => {
      try {
        const response = await apiInstance.get(`/delivery-type/${deliveryId}`);
        return response.data.data;
      } catch (error) {
        console.error(error);
        return {};
      }
    };

    async function fetchData() {
      setIsLoading(true);
      try {
        const orderDetailPromise = apiInstance.get(`/orders/me/${orderId}`);
        const paymentInfoPromise = apiInstance.get(
          `/payment-type/${paymentId}`
        );

        const [orderDetailResponse, paymentResponse] = await Promise.all([
          orderDetailPromise,
          paymentInfoPromise,
        ]);

        const orderDetailData = orderDetailResponse.data.data;
        const paymentData = paymentResponse.data.data;

        const deliveryData = await fetchDeliveryInfo(
          orderDetailData.deliveryMethod
        );

        setOrderDetail(orderDetailData);
        setPayment(paymentData);
        setDelivery(deliveryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [orderId, paymentId]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
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
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(orderDetail.totalPrice);

  const deliveryFee = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(orderDetail.shippingPrice);
  return (
    <View className="px-2 py-8">
      <View className="flex flex-row justify-between">
        <Text className="font-bold">Order №{orderId}</Text>
        <Text className="text-black">
          {new Date(orderDetail.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View className="flex flex-row justify-between pt-2">
        <Text>Customer: {orderDetail.shippingAddress.fullName}</Text>
        <Text className="">
          {orderDetail.isDelivered === 0 ? (
            <Text className="text-red-500">Not Delivered</Text>
          ) : orderDetail.isDelivered === 1 ? (
            <Text className="text-green-500">Delivered</Text>
          ) : null}
        </Text>
      </View>
      <View className="mt-2">
        <Text>{orderDetail.orderItems.length} items</Text>
      </View>

      {/* Product card */}
      <View>
        {orderDetail.orderItems.map((item, index) => (
          <View
            key={index}
            className="my-2 py-1 border border-gray-300 bg-white h-[110px] rounded-lg shadow-md"
          >
            <View className="flex flex-row">
              <View className="flex justify-center items-center">
                <Image
                  source={{ uri: item.image }}
                  className="h-[95px] w-[100px]"
                />
              </View>
              <View className="flex flex-col ml-2  ">
                <Text className="font-bold text-sm max-w-[280px]">
                  {item.name}
                </Text>
                <View className="flex flex-row justify-between mt-3 ">
                  <Text className="text-sm">Units: {item.amount}</Text>
                  <Text className="text-sm text-red-500">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price * item.amount)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* order infomation  */}
      <View className="mt-6">
        <Text className="font-bold text-black text-base">
          Order Information
        </Text>
        <View className="flex flex-col mt-2 space-y-2">
          <View>
            <Text className="text-base">
              Shipping Address: {orderDetail.shippingAddress.address},{" "}
              {orderDetail.shippingAddress.city.name}
            </Text>
          </View>
          <View>
            <Text className="text-base">Payment method: {payment.name}</Text>
          </View>
          <View>
            <Text className="text-base">Delivery method: {delivery.name}</Text>
          </View>
          <View>
            <Text className="text-base">Delivery fee: {deliveryFee}</Text>
          </View>
          <View>
            <Text className="text-base">
              Total Ammout:{" "}
              <Text className="text-red-500 font-bold">{formattedPrice}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default OrderDetail;
