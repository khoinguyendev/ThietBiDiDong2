import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useRef, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Header() {
  const textInputRef = useRef(null); // Create a ref for the TextInput
  const [isFocused, setIsFocused] = useState(false); // Track if TextInput is focused
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [isLoading, setIsLoading] = useState(false); // Loading state
  useEffect(() => {
    // Automatically focus the TextInput when the component mounts
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ paddingTop: 36 }} onPress={() => router.back()}>
        <Ionicons style={{ padding: 10 }} name="arrow-back-sharp" size={28} color={Colors.PRIMARY} />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput
          ref={textInputRef} // Attach the ref to the TextInput
          style={{ flex: 1, height: 30, color: "gray" }}
        />
        <View style={{ backgroundColor: Colors.PRIMARY, height: 33, width: 50, alignItems: "center", justifyContent: "center" }}>
          <FontAwesome name="search" size={20} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
