import React, { useEffect } from "react";
import { Stack, Slot } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, Text } from "react-native";
import store from "../redux/store";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCart } from "../redux/cartSlice"; // Assuming setCart action exists
import Toast from "react-native-toast-message";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      // await AsyncStorage.removeItem("carts");
      const storedCart = await AsyncStorage.getItem("carts");
      if (storedCart) {
        dispatch(setCart(JSON.parse(storedCart))); // Load data from AsyncStorage into Redux
      }
    };
    loadCart(); // Call loadCart when the app starts
  }, [dispatch]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignupScreen" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  // Show loading screen if fonts are not loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  // Wrap everything with the Provider component
  return (
    <Provider store={store}>
      <AppContent />
      <Toast />
    </Provider>
  );
}
