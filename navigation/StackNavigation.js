import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopMapScreen from '../screens/MapScreen';
const Stack = createStackNavigator();



//Stack này chứa các màn hình như home, product detail, about...
const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

//Stack này chứa các màn hình như Cart, Payment, Shopping Bag...
const CheckoutStack = () => {
    return (
      <Stack.Navigator>
          <Stack.Screen name="shopping" component={CartScreen} />
      </Stack.Navigator>
    )
}

//Stack này chứa các màn hình Sign in, Register 
const AuthStack = () => {
    return (
      <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    )
}

//Stack này chứa các màn hình Profile, Logout function
const ProfileStack = () => {
    return (
      <Stack.Navigator>
          <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    )
}
  
//Stack này chứa màn hình địa chỉ của shop
const MapStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="location" component={ShopMapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export {HomeStack, AuthStack, CheckoutStack, ProfileStack, MapStack} 