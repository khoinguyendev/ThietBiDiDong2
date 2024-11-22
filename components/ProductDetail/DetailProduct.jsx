import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";

export default function DetailProduct({ detail }) {
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái xem thêm/thu gọn

  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          color: "white",
          fontSize: 13,
          fontWeight: "bold",
          marginBottom: 6,
        }}
      >
        Mô tả sản phẩm
      </Text>
      <Text
        style={{ color: "gray", fontSize: 11 }}
        numberOfLines={isExpanded ? 0 : 4} // Mặc định hiển thị 4 dòng, nếu mở rộng sẽ hiển thị toàn bộ
      >
        {detail}
      </Text>

      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)} // Chuyển đổi trạng thái khi nhấn
      >
        <Text style={{ color: Colors.PRIMARY, marginTop: 5, textAlign: "center" }}>{isExpanded ? "Thu gọn" : "Xem thêm"}</Text>
      </TouchableOpacity>
    </View>
  );
}
