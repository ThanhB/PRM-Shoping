import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


export default function CheckoutScreen() {
  const cart = useSelector((state) => state.cart.cart);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
  const handlePaymentMethod = (method) => {
    if (method === "Credit Card" || method === "Bank Transfer") {
      Alert.alert("Notice", "This method will be updated soon");
    } else {
      setSelectedPaymentMethod(method); // Update the selected payment method state
    }
  };

  const handlePurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('success'); // Replace 'SuccessScreen' with the actual name of your success screen
    }, 1000);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}>
      <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Select your payment method
        </Text>
        <Text
          style={{ fontSize: 14, width: 200, marginTop: 4, color: "#9A9090" }}
        >
          Your seleted payment method will be choosen to pay the bill
        </Text>

        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedPaymentMethod === "Cash" && styles.selectedButton,
            ]}
            onPress={() => handlePaymentMethod("Cash")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedPaymentMethod === "Cash" && styles.buttonSelectedText,
              ]}
            >
              Cash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedPaymentMethod === "Credit Card" && styles.selectedButton,
            ]}
            onPress={() => handlePaymentMethod("Credit Card")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedPaymentMethod === "Credit Card" &&
                  styles.buttonSelectedText,
              ]}
            >
              Credit Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedPaymentMethod === "Bank Transfer" &&
                styles.selectedButton,
            ]}
            onPress={() => handlePaymentMethod("Bank Transfer")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedPaymentMethod === "Bank Transfer" &&
                  styles.buttonSelectedText,
              ]}
            >
              Bank Transfer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 2, backgroundColor: "white", paddingVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Checkout Confirmation
        </Text>

        <View style={{ marginTop: 16 }}>
          {cart?.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ width: "50%", textAlign: "left" }}>
                {item.name}
              </Text>
              <Text
                style={{ fontWeight: "bold", width: "50%", textAlign: "right" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item?.price)}
              </Text>
            </View>
          ))}

          <View
            style={{
              backgroundColor: "#CACACA",
              height: 1,
              marginVertical: 10,
            }}
          ></View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Total Pay</Text>
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(calculateTotal(cart))}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}></View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          padding: 10,
        }}
      >
        <TouchableOpacity style={styles.purchaseBtn} onPress={handlePurchase} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{color: 'white', fontWeight: 'bold', fontSize:14}}>Purchase</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    columnGap: 10,
  },
  button: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2980b9",
  },
  buttonText: {
    color: "#2980b9",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonSelectedText: {
    color: "#FFF",
  },

  selectedButton: {
    backgroundColor: "#2980b9",
  },

  purchaseBtn: {
    backgroundColor: 'green',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
