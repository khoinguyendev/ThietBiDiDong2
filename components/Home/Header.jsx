import { View, TextInput, StyleSheet, Text, Pressable, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { supabase } from "../../utils/supabase";
import { TouchableOpacity } from "react-native";

export default function Header() {
  const cart = useSelector((state) => state.cart.items);
  const [isFocused, setIsFocused] = useState(false); // Track if TextInput is focused
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        fetchProducts();
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(delayDebounceFn); // Clean up previous timeouts if the query changes
  }, [searchQuery]);

  // Fetch products from Supabase based on the search query
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data: products, error } = await supabase.from("Product").select("*").ilike("name", `%${searchQuery}%`).range(0, 9); // Perform case-insensitive search

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setSearchResults(products);
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Thanh tìm kiếm cố định */}
      <View style={styles.fixedSearchBar}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={20} color="black" />
          <TextInput
            placeholder="Tìm kiếm..."
            style={styles.textInput}
            onPress={() => router.push("/search/Search")}
            focusable={false}
            // onFocus={() => setIsFocused(true)} // Focus event
            // onBlur={() => setIsFocused(false)} // Blur event
            // onChangeText={setSearchQuery}
            // value={searchQuery}
          />
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => router.push("/cart/CartScreen")} style={styles.cartWrapper}>
            <Feather name="shopping-cart" size={24} color="white" />
            {/* Badge tròn hiển thị số */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.iconWrapper}>
            <Pressable style={styles.bellWrapper}>
              <FontAwesome6 name="bell" size={24} color="white" />
              {/* Badge tròn hiển thị số */}
              <View style={styles.badgeBell}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Search result panel */}
      {isFocused && searchResults.length > 0 && (
        <View style={styles.searchResultPanel}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()} // Assuming your products have an 'id' field
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    router.push(`product/${item.id}`);
                  }}
                  style={{ flexDirection: "row", paddingBottom: 5, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "gray" }}
                >
                  <Image style={{ height: 60, width: 60 }} source={{ uri: item.image }} />
                  <Text numberOfLines={2} style={{ fontSize: 12, padding: 10, color: "gray", paddingRight: 60 }}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
              style={{ maxHeight: 300 }} // Add this to limit the height for scroll
              showsVerticalScrollIndicator={false} // Optional: hide vertical scroll indicator
            />
          )}
          {searchResults.length === 0 && searchQuery !== "" && <Text style={styles.loaderContainer}>Không tìm thấy kết quả nào</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fixedSearchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ee4d2d",
    zIndex: 99,
    paddingVertical: 10,
    paddingTop: 45,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noResultsText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 6,
    flex: 1,
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 12,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartWrapper: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bellWrapper: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 20,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "white",
    display: "flex",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  badgeBell: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "white",
    display: "flex",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  searchResultPanel: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 98,
    padding: 10,
    elevation: 3,
  },
  resultItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
