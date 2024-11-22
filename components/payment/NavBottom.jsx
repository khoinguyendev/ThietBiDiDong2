import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../utils/supabase";
export default function NavBottom({ totalPrice, handleOrder }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: "flex-end", marginRight: 10 }}>
        <Text style={{ color: "white", fontSize: 10 }}>Tổng thanh toán</Text>
        <Text style={{ color: Colors.PRIMARY, fontSize: 12, fontFamily: "roboto-bold", marginLeft: 5 }}>
          ₫<Text style={{ fontSize: 12, fontFamily: "roboto-bold" }}>{totalPrice.toLocaleString("vi-VN")}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={handleOrder} style={{ flexDirection: "row", height: 50, backgroundColor: Colors.PRIMARY, alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ color: "white", fontSize: 10, textAlign: "center", fontFamily: "roboto-bold" }}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
});
