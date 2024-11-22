import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { CheckBox } from "react-native-elements";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setPayment } from "../../redux/paymentSlice";

export default function NavBottom({ items, setIsChecked, isChecked, totalPrice, checkedCount }) {
  const dispatch = useDispatch();

  const hanldeBuy = () => {
    if (checkedCount == 0) {
      Toast.show({
        text2: "Bạn vẫn chưa chọn sản phẩm nào !",
        text2Style: { color: "#0dcaf0", fontSize: 12, fontWeight: "400" },

        type: "info",
      });
      return;
    }
    dispatch(setPayment(items));
    router.push("/payment/Payment");
    return;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <CheckBox onPress={() => setIsChecked(!isChecked)} checkedColor="red" uncheckedColor="red" checked={isChecked} containerStyle={{ padding: 0 }} />
        <Text style={{ color: "gray", fontSize: 12 }}>Tất cả</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 2, justifyContent: "flex-end", marginRight: 10 }}>
        <Text style={{ color: "white", fontSize: 10 }}>Tổng thanh toán</Text>
        <Text style={{ color: Colors.PRIMARY, fontSize: 12, fontFamily: "roboto-bold", marginLeft: 5 }}>
          ₫<Text style={{ fontSize: 12, fontFamily: "roboto-bold" }}>{totalPrice?.toLocaleString("vi-VN")}</Text>
        </Text>
      </View>
      <Pressable onPress={hanldeBuy} style={{ flexDirection: "row", height: 50, backgroundColor: Colors.PRIMARY, alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ color: "white", fontSize: 10, textAlign: "center", fontFamily: "roboto-bold" }}>Mua hàng({checkedCount})</Text>
      </Pressable>
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
  },
});
