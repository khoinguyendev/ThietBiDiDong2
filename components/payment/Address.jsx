import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Colors } from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AddressMap from "../modal/AddressMap";
import * as Location from "expo-location";

export default function Address() {
  const [location, setLocation] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const onClose = () => setIsVisible(false);
  const hanldeChoose = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Quyền truy cập vị trí bị từ chối");
      return;
    }
    setIsVisible(true);
  };
  return (
    <View style={{ backgroundColor: "black", padding: 20, flexDirection: "row", borderBottomWidth: 1, borderStyle: "dashed", borderColor: Colors.PRIMARY }}>
      <EvilIcons name="location" size={24} color={Colors.PRIMARY} />

      <View>
        <Text style={{ fontSize: 10, color: "white", marginBottom: 5 }}>Địa chỉ nhận hàng</Text>
        <Text style={{ fontSize: 10, color: "white" }}>Nguyễn Trần Khôi Nguyên, 0389557026 </Text>
        {location ? (
          <Text style={{ fontSize: 10, color: "white", paddingRight: 15 }}>{location}</Text>
        ) : (
          <Text style={{ fontSize: 10, color: "white", paddingRight: 15 }}>Vui lòng chọn địa chỉ giao hàng</Text>
        )}

        {/* <Text style={{ fontSize: 10, color: "white", paddingRight: 15 }}>Kí Túc Xá Cao Đẳng Công Thương Tp.HCM, Đường Tăng Nhơn Phú</Text> */}
        {/* <Text style={{ fontSize: 10, color: "white", paddingRight: 15 }}>Phường Phước Long B, Thành phố Thủ Đức, Tp. Hồ Chí Minh</Text> */}
        <TouchableOpacity onPress={hanldeChoose} style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 5, gap: 5, borderColor: Colors.PRIMARY, borderWidth: 1 }}>
            <Text style={{ color: "white", fontSize: 12, color: Colors.PRIMARY }}>Chọn vị trí</Text>
            <FontAwesome name="location-arrow" size={12} color={Colors.PRIMARY} />
          </View>
        </TouchableOpacity>
      </View>
      <AddressMap isVisible={isVisible} onClose={onClose} setLocationParent={setLocation} />
    </View>
  );
}
