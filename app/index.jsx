import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter(); // Using router for redirection

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        router.replace("(tabs)/home"); // Redirect to home if user exists
      } else {
        router.replace("/LoginScreen"); // Redirect to login screen if no user
      }
    };

    checkUser(); // Call the async function
  }, []); // Empty dependency array ensures this runs once when component mounts

  return null; // No JSX to return as redirection happens imperatively
}
