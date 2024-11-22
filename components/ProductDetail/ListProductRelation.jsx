import { View, Text, FlatList } from "react-native";
import React from "react";
import ProductItem from "../global/ProductItem";

export default function ListProduct({ products }) {
  return (
    <View>
      <FlatList style={{ backgroundColor: "gray", paddingVertical: 10 }} horizontal={true} data={products} renderItem={({ item, index }) => <ProductItem product={item} key={item.id} />} />
    </View>
  );
}
