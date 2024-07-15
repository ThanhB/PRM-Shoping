import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import {
  CheckoutStack,
  HomeStack,
  ProductStack,
  MapStack,
  ProfileStack,
} from "./StackNavigation";
import CheckAuthWrapper from "../components/CheckAuthWrapper";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <CheckAuthWrapper>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="store" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Shopping"
          component={CheckoutStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="shopping-cart" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Map"
          component={MapStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="share-location" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </CheckAuthWrapper>
  );
};

export default TabNavigation;
