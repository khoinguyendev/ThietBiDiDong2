import { View, Text, Image, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import ItemCart from "./ItemCart";

export default function ListItem({ carts, setCheckedItems, checkedItems }) {
  return (
    <ScrollView>
      <View style={{ paddingVertical: 20, backgroundColor: "black", borderRadius: 8 }}>
        {/* <FlatList data={carts} renderItem={({ item, index }) => <ItemCart cart={item} key={item.id} />} /> */}
        {carts.map((item, index) => (
          <ItemCart cart={item} key={item.id + item.variant_id?.id} isChecked={checkedItems[index]} setCheckedItems={setCheckedItems} index={index} />
        ))}
      </View>
    </ScrollView>
  );
}
