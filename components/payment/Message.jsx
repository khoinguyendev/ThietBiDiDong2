import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import PaymentMethod from "../modal/PaymentMethod";

export default function Message({ paymentMethod, setPaymentMethod }) {
  const [isVisible, setIsVisible] = useState(false);
  const onClose = () => setIsVisible(false);
  return (
    <>
      <View style={{ backgroundColor: "black", marginTop: 4, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/checklist.png")} />
          <Text style={{ color: "white", fontSize: 12 }}>Voucher</Text>
        </View>
        <View>
          <Text style={{ color: "gray", fontSize: 12 }}>Chọn hoặc nhập mã</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={{ backgroundColor: "black", marginTop: 4, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/coin.png")} />
          <Text style={{ color: "white", fontSize: 11 }}>Phương thức thanh toán</Text>
        </View>
        <View>
          {paymentMethod === "COD" ? (
            <Text style={{ color: "gray", fontSize: 11 }}> Thanh toán khi nhận hàng</Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/LogoZL.png")} />
              <Text style={{ color: "gray", marginLeft: 10, fontSize: 11 }}>Zalo pay</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <PaymentMethod isVisible={isVisible} onClose={onClose} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  buttonText: {
    fontSize: 18,
    color: "blue",
  },
});
