import { View, Text, ActivityIndicator, FlatList, Image, TextInput } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Make sure FontAwesome is imported
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Colors } from "../../constants/Colors";

export default function Search() {
  const [products, setProducts] = useState([]); // Original list of products
  const [searchResults, setSearchResults] = useState([]); // Filtered list based on search
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const textInputRef = useRef(null); // Reference for TextInput

  // Automatically focus the TextInput when the component mounts
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  // Fetch products from Supabase when search query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        fetchProducts(); // Fetch filtered products
      }
    }, 1000); // Delay search to avoid frequent API calls

    return () => clearTimeout(delayDebounceFn); // Cleanup previous timeouts if query changes
  }, [searchQuery]);

  // Fetch products from Supabase based on search query
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data: products, error } = await supabase.from("Product").select("*").ilike("name", `%${searchQuery}%`).range(0, 9); // Perform case-insensitive search

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setSearchResults(products); // Store the filtered products
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ paddingTop: 36 }} onPress={() => router.back()}>
          <Ionicons style={{ padding: 10 }} name="arrow-back-sharp" size={28} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={setSearchQuery}
            value={searchQuery}
            ref={textInputRef} // Attach the ref to the TextInput
            style={{ flex: 1, height: 30, color: "gray" }}
          />
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              height: 33,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="search" size={20} color="white" />
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "#212121", flex: 1, padding: 20 }}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        ) : (
          <FlatList
            data={searchResults} // Use searchResults instead of products
            keyExtractor={(item) => item.id.toString()} // Assuming your products have an 'id' field
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push(`product/${item.id}`);
                }}
                style={{ marginBottom: 10, flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Image style={{ height: 60, width: 60 }} source={{ uri: item.image }} />
                <Text numberOfLines={2} style={{ color: "white", fontSize: 10, flex: 1 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    paddingRight: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.PRIMARY,
    borderWidth: 1.5,
    overflow: "hidden",
    paddingLeft: 8,
    borderRadius: 6,
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
