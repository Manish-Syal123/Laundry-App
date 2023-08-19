import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PickUpScreen from "./screens/PickUpScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import DemoLogin from "./screens/DemoLogin";
import DemoRegistration from "./screens/DemoRegistration";
import DemoWelcome from "./screens/DemoWelcome";
import OnboardingScreen from "./screens/OnboardingScreen";
import { getItem } from "./utils/asyncStorage";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        {/* First Screen(in stackNavigator) which will be displayed right after opening the app */}
        <Stack.Navigator initialRouteName="OnBoard">
          <Stack.Screen
            name="OnBoard"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DemoWlc"
            component={DemoWelcome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Demolog"
            component={DemoLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Demoreg"
            component={DemoRegistration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickUp"
            component={PickUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        {/* First Screen(in stackNavigator) which will be displayed right after opening the app */}
        <Stack.Navigator>
          <Stack.Screen
            name="DemoWlc"
            component={DemoWelcome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Demolog"
            component={DemoLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Demoreg"
            component={DemoRegistration}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OnBoard"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PickUp"
            component={PickUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNavigator;

const styles = StyleSheet.create({});
