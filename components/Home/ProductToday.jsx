import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import ProductItem from "../global/ProductItem";

export default function ProductToday() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Track the page number

  const fetchProducts = async (page) => {
    try {
      const { data, error } = await supabase
        .from("Product")
        .select("*")
        .range(page * 10, (page + 1) * 10 - 1);
      if (data) {
        setProducts((prev) => [...prev, ...data]); // Append new products
      }
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      setPage((prev) => prev + 1); // Increment page to fetch more products
    }
  };

  if (loading && page === 0) {
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
      <Text style={styles.headerText}>Gợi ý hôm nay</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Chia thành 2 cột
        columnWrapperStyle={styles.columnWrapper} // Thêm style cho hàng
        onEndReached={handleLoadMore} // Trigger loading more products
        onEndReachedThreshold={0} // Trigger when the user is 50% away from the bottom
      />
      {loading && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: -7,
  },
  headerText: {
    paddingLeft: 20,
    marginVertical: 10,
    fontSize: 18,
    fontFamily: "roboto-bold",
  },
  columnWrapper: {
    marginBottom: 10,
    justifyContent: "space-around", // Tạo khoảng cách giữa các cột
    marginHorizontal: 8, // Khoảng cách lề giữa các item
  },
});
