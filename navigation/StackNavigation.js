import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShopMapScreen from "../screens/MapScreen";
import OrderListScreen from "../screens/OrderListScreen";
import AccountDetail from "../screens/AccountDetail";
import OrderDetail from "../screens/OderDetail";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductListScreen from "../screens/ProductListScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import SuccessScreen from "../screens/SuccessScreen";

const Stack = createStackNavigator();

//Stack này chứa các màn hình như home, product detail, about...
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Detail" }}
      />
    </Stack.Navigator>
  );
};

//Stack này chứa các màn hình như Cart, Payment, Shopping Bag...
const CheckoutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="shopping" component={CartScreen}  options={{ headerShown: false, headerTitle: "" }}/>
      <Stack.Screen name="checkout" component={CheckoutScreen}  options={{ headerShown: true, headerTitle: "Checking out" }}/>
      <Stack.Screen name="success" component={SuccessScreen}  options={{ headerShown: false, headerTitle: "" }}/>
    </Stack.Navigator>
  );
};

//Stack này chứa các màn hình Sign in, Register
const AuthStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

//Stack này chứa các màn hình Profile, Logout function
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="orderList"
        component={OrderListScreen}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen name="Order Detail" component={OrderDetail} />
      <Stack.Screen
        name="accountDetail"
        component={AccountDetail}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};

//Stack này chứa màn hình địa chỉ của shop
const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="location"
        component={ShopMapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export {
  HomeStack,
  AuthStack,
  CheckoutStack,
  ProfileStack,
  MapStack,
  ProductStack,
};
