import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

export default function ProductItem({ product }) {
  return (
    <Pressable onPress={() => router.push("/product/1")} style={{ padding: 5, backgroundColor: "white", borderRadius: 10, marginLeft: 10, position: "relative" }}>
      <Image
        source={{ uri: product?.image }}
        style={{
          width: 170,
          height: 170,
          borderRadius: 10,
        }}
      />
      <View style={{ paddingLeft: 12, paddingRight: 5 }}>
        <Text style={{ color: "green", fontFamily: "roboto-bold", width: 150, fontSize: 12, marginTop: 5 }}>{product?.name}</Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 11, marginTop: 3 }}>{product?.sale.toLocaleString("vi-VN")}₫</Text>
          <Text style={{ color: "gray", textDecorationLine: "line-through", fontSize: 10, marginTop: 3 }}>{product?.price.toLocaleString("vi-VN")}₫</Text>
        </View>
        <View style={{ marginVertical: 5, display: "flex", gap: 5, flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../../assets/images/star.png")} style={{ height: 15, width: 15 }} />
          <Text style={{ color: "gray", fontSize: 12 }}>(4.5)</Text>
          <View style={{ marginLeft: 30 }}>
            <Text style={{ fontSize: 10, color: "gray" }}>Tp.HCM</Text>
          </View>
        </View>
      </View>
      <Image source={require("../../assets/images/sale.png")} style={{ height: 50, width: 50, position: "absolute", top: -10, right: -10 }} />
    </Pressable>
  );
}
