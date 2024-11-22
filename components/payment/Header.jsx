import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons style={{ padding: 10 }} name="arrow-back-sharp" size={28} color={Colors.PRIMARY} />
      </TouchableOpacity>
      <Text style={{ color: "white", padding: 10 }}>Thanh toán</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
