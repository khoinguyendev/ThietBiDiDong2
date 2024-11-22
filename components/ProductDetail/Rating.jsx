import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Rating() {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            alignSelf: "flex-start",
            width: 50,
            height: 50,
            marginEnd: 5,
            borderRadius: 50,
            backgroundColor: "white",
            transform: [{ scale: 0.7 }],
          }}
          source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/024/212/249/small_2x/ai-generated-sticker-anime-girl-with-blue-hair-png.png" }}
        />
        <View style={{ paddingTop: 5 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>Anime Girl</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
          </View>
          <Text style={{ fontSize: 10, color: "white", width: 300, marginTop: 10 }}>
            Dùng thử thấy oke ạ, giá rẻ nên không đòi hỏi gì hơn ạ, nếu bền lâu dài thì càng tốt hơn hihi, nên mua nha mn, vừa giá tiền, shop gói hàng cx oke, giao hàng nhanh quá trời, trong HN là 1
            ngày thôi ạ.
          </Text>
          <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>2023-12-13 16:53</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            alignSelf: "flex-start",
            width: 50,
            height: 50,
            marginEnd: 5,
            borderRadius: 50,
            backgroundColor: "white",
            transform: [{ scale: 0.7 }],
          }}
          source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/024/212/249/small_2x/ai-generated-sticker-anime-girl-with-blue-hair-png.png" }}
        />
        <View style={{ paddingTop: 5 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>Anime Girl</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
            <FontAwesome name="star" size={14} color="orange" />
          </View>
          <Text style={{ fontSize: 10, color: "white", width: 300, marginTop: 10 }}>
            Dùng thử thấy oke ạ, giá rẻ nên không đòi hỏi gì hơn ạ, nếu bền lâu dài thì càng tốt hơn hihi, nên mua nha mn, vừa giá tiền, shop gói hàng cx oke, giao hàng nhanh quá trời, trong HN là 1
            ngày thôi ạ.
          </Text>
          <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>2023-12-13 16:53</Text>
        </View>
      </View>
    </View>
  );
}
