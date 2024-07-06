import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./navigation/TabNavigation";
import { navigationRef } from "./navigationRef";
import ResolveAuthScreen from "./screens/ResolveAuthScreen";
import { Provider as AuthProvider } from "./context/AuthContext";
import AuthNavigation from "./navigation/AuthNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import "./styles.css";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="resolveAuth"
              component={ResolveAuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={AuthNavigation}
              name="Auth"
              options={{
                headerShown: false,
              }}
            /> */}
            <Stack.Screen
              component={TabNavigation}
              name="Main"
              options={{
                headerShown: false,
                title: "Home",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
