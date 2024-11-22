import { View, Text, Image } from "react-native";
import React from "react";

export default function ItemPayment({ payment }) {
  return (
    <View style={{ marginBottom: 15, flexDirection: "row" }}>
      <View style={{ borderRadius: 8, padding: 0, marginLeft: -10 }}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: payment.image }} />
      </View>
      <View style={{ alignSelf: "flex-start", marginLeft: 7 }}>
        <Text numberOfLines={1} style={{ color: "white", width: 260, fontSize: 10 }}>
          {payment.name}
        </Text>
        <Text style={{ color: "white", fontSize: 8, marginVertical: 5, borderWidth: 1, borderColor: "red", width: 72, padding: 3, borderRadius: 4, color: "red" }}>Đổi ý miễn phí</Text>

        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "baseline" }}>
            <Text style={{ color: "gray", fontSize: 11 }}>₫ {payment.total.toLocaleString("vi-VN")} </Text>
            <Text style={{ color: "gray", fontSize: 11 }}>x{payment.quantity} </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
