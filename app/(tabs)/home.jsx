import { View, Text, SectionList, StyleSheet } from "react-native";
import React from "react";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import Bussy from "../../components/Home/Bussy";
import ProductToday from "../../components/Home/ProductToday";
import Header from "../../components/Home/Header";

const sections = [{ data: [<Slider key="slider" />] }, { data: [<Category key="category" />] }, { data: [<Bussy key="bussy" />] }, { data: [<ProductToday key="productToday" />] }];

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <SectionList sections={sections} keyExtractor={(item, index) => item.key + index} renderItem={({ item }) => item} contentContainerStyle={styles.sectionListContent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionListContent: {
    paddingTop: 100, // Khoảng trống cho header
  },
});
