import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

export default function Header({ setOption, isPriceSortedAsc, setIsPriceSortedAsc }) {
  const [activeOption, setActiveOption] = useState(0); // Track active option, default is first (index 0)

  const options = ["Liên quan", "Mới nhất", "Bán chạy", "Giá"];

  const handlePricePress = (index) => {
    setActiveOption(index);
    setOption(options[index]);

    setIsPriceSortedAsc((prev) => (prev === null ? true : !prev)); // Toggle between true and false (null initially)
  };
  const handleOption = (index) => {
    setActiveOption(index);
    setOption(options[index]);
    if (index != 3) {
      setIsPriceSortedAsc(null);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons style={styles.icon} name="arrow-back-sharp" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.title}>Điện thoại</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="filter" size={24} color={Colors.PRIMARY} />
          <Text style={styles.filterText}>Lọc</Text>
        </View>
      </View>

      {/* Filters Row */}
      <View style={styles.filtersRow}>
        {options.map((option, index) => {
          if (option === "Giá") {
            return (
              <TouchableOpacity key={index} onPress={() => handlePricePress(index)} style={styles.filterOptionContainer}>
                <Text style={[styles.filterOption, activeOption === index && styles.active]}>
                  {option}{" "}
                  {isPriceSortedAsc === null ? (
                    <Entypo name="select-arrows" size={12} color={activeOption === index ? Colors.PRIMARY : "white"} />
                  ) : isPriceSortedAsc ? (
                    <AntDesign name="arrowup" size={12} color={Colors.PRIMARY} />
                  ) : (
                    <AntDesign name="arrowdown" size={12} color={Colors.PRIMARY} />
                  )}
                </Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity key={index} onPress={() => handleOption(index)} style={styles.filterOptionContainer}>
              <Text style={[styles.filterOption, activeOption === index && styles.active]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
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
    height: 120,
    backgroundColor: "black",
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 10,
  },
  title: {
    color: "white",
    paddingLeft: 10,
    fontSize: 16,
  },
  filterText: {
    color: Colors.PRIMARY,
    fontSize: 12,
    marginLeft: 5,
    paddingRight: 15,
  },
  filtersRow: {
    flexDirection: "row",
  },
  filterOptionContainer: {
    flex: 1, // Each option takes up 1/4 of the row
    justifyContent: "center", // Center content vertically
  },
  filterOption: {
    color: "white",
    textAlign: "center", // Center text horizontally
    paddingVertical: 6,
    fontSize: 12,
    fontFamily: "roboto",
  },
  active: {
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 2,
    color: Colors.PRIMARY,
  },
});
