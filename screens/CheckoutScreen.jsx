import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import apiInstance from "../api";
import { Context as AuthContext } from "../context/AuthContext";

const CheckoutScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await apiInstance.get("/payment-type");
        setPaymentMethods(response.data.data.paymentTypes);
      } catch (error) {
        console.error("Error fetching payment types:", error);
      }
    };
    fetchPaymentTypes();
  }, []);

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePurchase = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    if (
      !shippingAddress.fullName ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.phone
    ) {
      Alert.alert("Error", "Please fill out all shipping information");
      return;
    }

    setIsLoading(true);
    const orderItems = cart.map((item) => ({
      name: item.name,
      amount: item.quantity,
      image: item.image,
      price: item.price,
      discount: item.discount || 0,
      product: item.id,
    }));

    const orderData = {
      orderItems,
      paymentMethod: selectedPaymentMethod,
      itemsPrice: calculateTotal(cart),
      shippingPrice: 0,
      totalPrice: calculateTotal(cart),
      fullName: shippingAddress.fullName,
      city: shippingAddress.city,
      address: shippingAddress.address,
      phone: shippingAddress.phone,
      user: user._id,
      shippingAddress,
    };

    try {
      const response = await apiInstance.post("/orders", orderData);
      setIsLoading(false);
      if (response.data.status === "Success") {
        navigation.navigate("Success");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Failed to create order");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Select your payment method</Text>
        <Text style={styles.subtitle}>
          Your selected payment method will be used to pay the bill
        </Text>

        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method._id}
              style={[
                styles.paymentButton,
                selectedPaymentMethod === method._id && styles.selectedButton,
              ]}
              onPress={() => handlePaymentMethod(method._id)}
            >
              <Text
                style={[
                  styles.paymentButtonText,
                  selectedPaymentMethod === method._id &&
                    styles.selectedButtonText,
                ]}
              >
                {method.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChangeText={(text) =>
            setShippingAddress((prev) => ({ ...prev, fullName: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingAddress.address}
          onChangeText={(text) =>
            setShippingAddress((prev) => ({ ...prev, address: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingAddress.city}
          onChangeText={(text) =>
            setShippingAddress((prev) => ({ ...prev, city: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={shippingAddress.phone}
          onChangeText={(text) =>
            setShippingAddress((prev) => ({ ...prev, phone: text }))
          }
          keyboardType="phone-pad"
        />

        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cart?.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.orderItemName}>{item.name}</Text>
            <Text style={styles.orderItemPrice}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.price)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Pay</Text>
          <Text style={styles.totalAmount}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(calculateTotal(cart))}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.purchaseButtonText}>Purchase</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    width: 200,
    marginTop: 4,
    color: "#9A9090",
  },
  paymentMethodsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  paymentButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2980b9",
    marginBottom: 10,
    minWidth: "30%",
  },
  paymentButtonText: {
    color: "#2980b9",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#FFF",
  },
  selectedButton: {
    backgroundColor: "#2980b9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CACACA",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  orderItemName: {
    width: "50%",
    textAlign: "left",
  },
  orderItemPrice: {
    fontWeight: "bold",
    width: "50%",
    textAlign: "right",
  },
  divider: {
    backgroundColor: "#CACACA",
    height: 1,
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontWeight: "bold",
  },
  totalAmount: {
    fontWeight: "bold",
  },
  purchaseButton: {
    backgroundColor: "green",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  purchaseButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CheckoutScreen;
