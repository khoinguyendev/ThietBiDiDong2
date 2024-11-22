import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Notification() {
  return (
    <TouchableOpacity onPress={() => router.replace("/(tabs)/home")} style={{ padding: 30 }}>
      <Text>Tiếp tục mua sắm</Text>
    </TouchableOpacity>
  );
}
