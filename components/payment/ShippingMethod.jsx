import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export default function ShippingMethod({ priceShip }) {
  return (
    <View style={{ backgroundColor: "black", paddingHorizontal: 10, paddingVertical: 20, borderColor: "#0e8170", borderBottomWidth: 1, borderTopWidth: 1 }}>
      <Text style={{ color: "white", fontSize: 10 }}>Phương thức vận chuyển</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
        <Text style={{ color: "white", fontSize: 12 }}>Nhanh</Text>
        <Text style={{ color: "gray", fontSize: 12 }}>₫ {priceShip.toLocaleString("vi-VN")}</Text>
      </View>
      <Text style={{ color: "white", fontSize: 9 }}>Nhận hàng vào ngày 19 Tháng 9 - 21 Tháng 9</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 }}>
        <Feather name="truck" size={18} color="#0e8170" />
        <Text style={{ color: "gray", fontSize: 9 }}>Hoặc chọn hỏa tốc để</Text>
        <Text style={{ color: "#0e8170", fontSize: 9 }}>Nhận hàng vào ngày mai</Text>
      </View>
    </View>
  );
}
