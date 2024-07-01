import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Content from other screens */}
    </View>
  );
}

function TopNavigation() {
  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <TextInput placeholder="Search" style={{ flex: 1, marginRight: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingLeft: 5 }} />
      <TouchableOpacity>
        <FontAwesome name="search" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 10 }}>
        <FontAwesome name="shopping-cart" size={20} />
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: () => <TopNavigation /> }} />
      </Stack.Navigator>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <FontAwesome name="home" size={20} /> }} />
        <Tab.Screen name="Profile" component={HomeScreen} options={{ tabBarIcon: () => <FontAwesome name="user" size={20} /> }} />
        <Tab.Screen name="Location" component={HomeScreen} options={{ tabBarIcon: () => <FontAwesome name="map-marker" size={20} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;