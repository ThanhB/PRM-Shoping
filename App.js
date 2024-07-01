import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'; // Corrected ActivityIndicator import
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useAuth from "./src/hooks/useAuthen.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/Authen/login.jsx';
import ProductList from './src/screens/Product/productList.jsx';


const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ProductList} options={{ tabBarIcon: () => <FontAwesome name="home" size={20} /> }} />
      <Tab.Screen name="Profile" component={ProductList} options={{ tabBarIcon: () => <FontAwesome name="user" size={20} /> }} />
      <Tab.Screen name="Location" component={ProductList} options={{ tabBarIcon: () => <FontAwesome name="map-marker" size={20} /> }} />
      <Tab.Screen name="Cart" component={ProductList} options={{ tabBarIcon: () => <FontAwesome name="shopping-cart" size={20} /> }} />
    </Tab.Navigator>
  );
}

function App() {
  const { fetchUserInfo, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  // Initialize isAuthenticated to null to indicate that auth status is not yet determined
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("__token");
      if (token) {
        await fetchUserInfo();
        setIsAuth(true); // Set isAuthenticated to true if token exists and userInfo is fetched
      } else {
        setIsAuth(false); // Set isAuthenticated to false if no token
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <>
          <BottomTabNavigator />
        </>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}

export default App;
