import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
export default function Header() {
  const cart = useSelector((state) => state.cart.items);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons style={{ padding: 10 }} name="arrow-back-sharp" size={28} color={Colors.PRIMARY} />
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => router.push("/cart/CartScreen")} style={styles.cartWrapper}>
          <Feather name="shopping-cart" size={24} color={Colors.PRIMARY} />
          {/* Badge tròn hiển thị số */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => router.replace("/(tabs)/home")} style={styles.bellWrapper}>
            <AntDesign name="home" size={24} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: "space-between",
    zIndex: 5,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartWrapper: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bellWrapper: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 20,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "black",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    display: "flex",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  badgeBell: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "white",
    display: "flex",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: Colors.PRIMARY,
    fontSize: 10,
    fontWeight: "bold",
  },
});
