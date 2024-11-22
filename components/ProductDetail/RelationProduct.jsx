import { View, Text } from "react-native";
import React from "react";
import Bussy from "../Home/Bussy";
import ListProduct from "./ListProductRelation";

export default function RelationProduct({ products }) {
  return (
    <View>
      <Text
        style={{
          padding: 10,
          color: "white",
          fontSize: 13,
          fontWeight: "bold",
        }}
      >
        Sản phẩm tương tự
      </Text>
      <ListProduct products={products} />
    </View>
  );
}
