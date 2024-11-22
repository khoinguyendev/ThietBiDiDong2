import { View, ScrollView } from "react-native";
import React from "react";
import ItemPayment from "./ItemPayment";

export default function ListItem({ carts }) {
  return (
    <View style={{ backgroundColor: "black", padding: 20 }}>
      {/* <FlatList data={carts} renderItem={({ item, index }) => <ItemCart cart={item} key={item.id} />} /> */}
      {carts.map((item) => (
        <ItemPayment payment={item} key={item.id} />
      ))}
    </View>
  );
}
