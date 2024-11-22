import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

export default function BussyItem({ product }) {
  return (
    <Pressable onPress={() => router.push(`/product/${product?.Product.id}`)} style={{ padding: 5, backgroundColor: "white", borderRadius: 10, marginLeft: 10, position: "relative" }}>
      <Image
        source={{ uri: product?.Product.image }}
        style={{
          width: 170,
          height: 170,
          borderRadius: 10,
        }}
      />

      <View style={{ paddingLeft: 12, paddingRight: 5 }}>
        <Text numberOfLines={2} style={{ color: "green", height: 33, textAlign: "left", fontFamily: "roboto-bold", width: 155, fontSize: 10, marginTop: 5 }}>
          {product?.Product.name}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {product?.Product?.Default_selection ? (
            <Text style={{ color: "red", fontSize: 11, marginTop: 3 }}>{product.Product.Default_selection.price.toLocaleString("vi-VN")}₫</Text>
          ) : (
            <>
              <Text style={{ color: "red", fontSize: 11, marginTop: 3 }}>
                {product.Product.sale ? product?.Product.price_sale?.toLocaleString("vi-VN") : product?.Product.price?.toLocaleString("vi-VN")}₫
              </Text>
              {product.Product.sale && <Text style={{ color: "gray", textDecorationLine: "line-through", fontSize: 10, marginTop: 3 }}>{product?.Product.price.toLocaleString("vi-VN")}₫</Text>}
            </>
          )}
        </View>
        <View style={{ marginVertical: 5, display: "flex", gap: 5, flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../../assets/images/star.png")} style={{ height: 15, width: 15 }} />
          <Text style={{ color: "gray", fontSize: 12 }}>({product?.Product.rating})</Text>
          <View style={{ alignSelf: "flex-end", flex: 1 }}>
            <Text style={{ fontSize: 10, color: "gray", textAlign: "right" }}>{product?.Product.location}</Text>
          </View>
        </View>
      </View>
      <Image source={require("../../assets/images/hot.png")} style={{ height: 30, width: 30, position: "absolute", top: 0, right: 0 }} />
    </Pressable>
  );
}
