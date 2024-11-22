import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { Colors } from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, saveCartToStorage } from "../../redux/cartSlice";
export default function ItemCart({ cart, isChecked, setCheckedItems, index }) {
  const toggleChecked = () => {
    setCheckedItems(
      (prev) => prev.map((item, i) => (i === index ? !item : item)) // Toggle only the current item
    );
  };
  const dispatch = useDispatch();

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
    dispatch(saveCartToStorage());
  };

  const handleDecrement = (productId, quantity) => {
    if (quantity === 1) {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn xóa sản phẩm này?",

        [
          {
            text: "Không",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Có",
            onPress: () => handleRemoveProduct(productId),
          },
        ],
        { cancelable: false } // Disable dismissing the alert by tapping outside
      );
    } else {
      dispatch(decrementQuantity(productId));
      dispatch(saveCartToStorage());
    }
  };
  const handleRemoveProduct = (productId) => {
    // Update checked items and dispatch decrement
    setCheckedItems(
      (prev) => prev.filter((_, i) => i !== index) // Remove the item from checked items
    );
    dispatch(decrementQuantity(productId));
    dispatch(saveCartToStorage());
  };
  const printConfig = () => {
    let config = [];

    if (cart.variant_id.color) {
      config.push(cart.variant_id.color);
    }
    if (cart.variant_id.size) {
      config.push(cart.variant_id.size);
    }
    if (cart.variant_id.configuration) {
      config.push(cart.variant_id.configuration);
    }

    return config.join(", ");
  };
  return (
    <View style={{ marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
      <View style={{ marginLeft: -15 }}>
        <CheckBox checkedColor="red" uncheckedColor="red" checked={isChecked} onPress={toggleChecked} containerStyle={{ paddingLeft: 20 }} />
      </View>
      <View style={{ borderRadius: 8, padding: 0, marginLeft: -10 }}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: cart.image }} />
      </View>
      <View style={{ alignSelf: "flex-start", paddingTop: 10, marginLeft: 7 }}>
        <Text numberOfLines={1} style={{ color: "white", width: 210, fontSize: 10 }}>
          {cart.name}
        </Text>
        {cart.variant_id && (
          <Text numberOfLines={1} style={{ color: "gray", width: 210, fontSize: 9 }}>
            {printConfig()}
          </Text>
        )}
        <Text style={{ color: "white", fontSize: 8, marginVertical: 5, borderWidth: 1, borderColor: "red", width: 69, padding: 3, borderRadius: 4, color: "red" }}>Đổi ý 15 ngày</Text>
        <View>
          <Image
            source={require("../../assets/images/image.png")}
            style={{
              width: 60,
              height: 16,
              resizeMode: "stretch",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
            <Text style={{ color: Colors.PRIMARY, fontSize: 8, fontFamily: "roboto-bold" }}>
              ₫<Text style={{ fontSize: 12, fontFamily: "roboto-bold" }}>{cart.sale ? cart?.price_sale.toLocaleString("vi-VN") : cart?.price.toLocaleString("vi-VN")}</Text>
            </Text>
            {cart.sale && <Text style={{ color: "gray", fontSize: 8, textDecorationLine: "line-through" }}>₫{cart?.price.toLocaleString("vi-VN")} </Text>}
          </View>
          {/* <Text style={{ color: "green", fontWeight: "bold", fontSize: 9 }}>₫{cart?.total.toLocaleString("vi-VN")} </Text> */}
        </View>
        <View style={{ justifyContent: "flex-end", gap: 10, marginRight: 10, marginTop: 10, alignItems: "center", flexDirection: "row" }}>
          {/* <Text style={{ color: "red", fontSize: 30, lineHeight: 30, borderRadius: 30, width: 30, borderColor: "red", borderWidth: 1, textAlign: "center", height: 30, alignItems: "center" }}>-</Text> */}
          <Pressable onPress={() => handleDecrement(cart.id, cart.quantity)}>
            <Image
              source={require("../../assets/images/delete.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Pressable>
          <Text style={{ color: "white" }}>{cart.quantity}</Text>
          {/* <Text style={{ color: "red", fontSize: 20, lineHeight: 30, borderRadius: 30, width: 30, borderColor: "red", borderWidth: 1, textAlign: "center", height: 30, alignItems: "center" }}>+</Text> */}
          <Pressable onPress={() => handleIncrement(cart.id)}>
            <Image
              source={require("../../assets/images/plus.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
