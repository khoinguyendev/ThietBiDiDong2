import { Modal, View, Text, Pressable, StyleSheet, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function PaymentMethod({ isVisible, children, onClose, paymentMethod, setPaymentMethod }) {
  const handleMethod = (method) => {
    setPaymentMethod(method);
    onClose();
  };
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <TouchableOpacity onPress={onClose} style={{ width: 30, height: 30, justifyContent: "center" }}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handleMethod("COD")}
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, borderBottomColor: "gray", borderBottomWidth: 1 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/money.png")} />
                <Text style={{ color: "white", marginLeft: 10, fontSize: 11 }}>Thanh toán khi nhận hàng</Text>
              </View>
              {paymentMethod === "COD" && <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/checked.png")} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleMethod("ZALOPAY")}
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, borderBottomColor: "gray", borderBottomWidth: 1 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/LogoZL.png")} />
                <Text style={{ color: "white", marginLeft: 10, fontSize: 11 }}>Zalo pay</Text>
              </View>
              {paymentMethod === "ZALOPAY" && <Image style={{ width: 24, height: 24 }} source={require("../../assets/images/checked.png")} />}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    height: "50%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  methodsContainer: {
    padding: 20,
  },
});
