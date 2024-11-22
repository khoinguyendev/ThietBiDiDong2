import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function Bill({ priceShip, totalPrice }) {
  return (
    <>
      <View style={{ backgroundColor: "black", marginTop: 4, padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/invoice.png")} />
          <Text style={{ color: "white", fontSize: 11 }}>Chi tiết thanh toán</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "#C0C0C0", fontSize: 9 }}>Tổng tiền hàng</Text>
          <Text style={{ color: "#C0C0C0", fontSize: 9 }}>₫{totalPrice.toLocaleString("vi-VN")}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 3, alignItems: "center" }}>
          <Text style={{ color: "#C0C0C0", fontSize: 9 }}>Tổng tiền phí vận chuyển</Text>
          <Text style={{ color: "#C0C0C0", fontSize: 9 }}>₫{priceShip.toLocaleString("vi-VN")}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 12 }}>Tổng thanh toán</Text>
          <Text style={{ color: Colors.PRIMARY, fontSize: 12 }}>₫{(totalPrice + priceShip).toLocaleString("vi-VN")}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: "black", marginTop: 4, padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/policy.png")} />
          <Text style={{ color: "white", fontSize: 10, paddingRight: 10 }}>Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý tuân thủ theo Điều khoản của Shop</Text>
        </View>
      </View>
    </>
  );
}
