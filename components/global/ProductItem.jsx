import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

export default function ProductItem({ product, soldQuantity = false }) {
  return (
    <Pressable onPress={() => router.push(`/product/${product?.id}`)} style={{ padding: 5, overflow: "hidden", backgroundColor: "white", borderRadius: 10, marginLeft: 10, position: "relative" }}>
      <Image
        source={{ uri: product?.image }}
        style={{
          width: 170,
          height: 170,
          borderRadius: 10,
        }}
      />
      <View style={{ paddingLeft: 10, paddingRight: 5 }}>
        <Text numberOfLines={2} style={{ color: "green", height: 32, textAlign: "left", fontFamily: "roboto-bold", width: 155, fontSize: 10, marginTop: 5 }}>
          {product?.name}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 11, marginTop: 3 }}>{product.sale ? product?.price_sale?.toLocaleString("vi-VN") : product?.price?.toLocaleString("vi-VN")}₫</Text>
          {product.sale && <Text style={{ color: "gray", textDecorationLine: "line-through", fontSize: 10, marginTop: 3 }}>{product?.price.toLocaleString("vi-VN")}₫</Text>}
        </View>
        <View style={{ marginVertical: 5, display: "flex", gap: 5, flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../../assets/images/star.png")} style={{ height: 15, width: 15 }} />
          <Text style={{ color: "gray", fontSize: 10 }}>({product?.rating})</Text>
          <View style={{ alignSelf: "flex-end", flex: 1 }}>
            <Text style={{ fontSize: 10, color: "gray", textAlign: "right" }}>{product?.location}</Text>
          </View>
        </View>
        {soldQuantity && <Text style={{ fontSize: 10, color: "gray" }}>Đã bán {product.sold_quantity}</Text>}
      </View>
      {product?.sale && (
        <Text style={{ backgroundColor: "#f4c9be", color: "red", position: "absolute", width: 30, textAlign: "center", paddingVertical: 2, top: 0, right: 0, fontSize: 8 }}>
          -{Math.round(((product.price - product.price_sale) / product.price) * 100)}%
        </Text>
      )}
    </Pressable>
  );
}
