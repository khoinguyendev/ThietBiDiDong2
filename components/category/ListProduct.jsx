import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../utils/supabase";
import ProductItem from "../global/ProductItem";

export default function ListProduct({ option, isPriceSortedAsc }) {
  const { id } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let query = supabase.from("Product").select("id,image,location,price,price_sale,rating,sale,name,created_at,sold_quantity").eq("category_id", id);

      if (option === "Mới nhất") {
        query = query.order("created_at", { ascending: false }); // Sort by date, newest first
      } else if (option === "Bán chạy") {
        query = query.order("sold_quantity", { ascending: false }); // Sort by sold quantity
      }

      try {
        const { data, error } = await query;
        if (error) throw error;

        // Sort by price in the frontend if the option is "Giá"
        if (option === "Giá") {
          data.sort((a, b) => {
            const priceA = a.sale ? a.price_sale : a.price;
            const priceB = b.sale ? b.price_sale : b.price;

            return isPriceSortedAsc ? priceA - priceB : priceB - priceA;
          });
        }
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, option, isPriceSortedAsc]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} soldQuantity={option === "Bán chạy" ? true : false} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Chia thành 2 cột
        columnWrapperStyle={styles.columnWrapper} // Thêm style cho hàng
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    marginLeft: -7,
  },
  headerText: {
    paddingLeft: 20,
    marginVertical: 10,
    fontSize: 18,
    fontFamily: "roboto-bold",
  },
  columnWrapper: {
    marginTop: 10,
    // marginBottom: 10,
    justifyContent: "space-around", // Tạo khoảng cách giữa các cột
    marginHorizontal: 8, // Khoảng cách lề giữa các item
  },
});
