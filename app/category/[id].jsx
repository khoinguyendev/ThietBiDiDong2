import { View, Text } from "react-native";
import React, { useState } from "react";
import ListProduct from "../../components/category/ListProduct";
import { StyleSheet } from "react-native";
import Header from "../../components/category/Header";

export default function Category() {
  const [option, setOption] = useState("Liên quan");
  const [isPriceSortedAsc, setIsPriceSortedAsc] = useState(null); // Track sorting direction for price

  return (
    <View style={styles.container}>
      <Header setOption={setOption} isPriceSortedAsc={isPriceSortedAsc} setIsPriceSortedAsc={setIsPriceSortedAsc} />
      <ListProduct option={option} isPriceSortedAsc={isPriceSortedAsc} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "black",
    paddingTop: 110,
  },
});
