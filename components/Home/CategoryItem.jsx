import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function CategoryItem({ category }) {
  return (
    <TouchableOpacity style={{ width: 80 }} onPress={() => router.push(`/category/${category.id}`)}>
      <View style={{ paddingTop: 5, paddingBottom: 0, alignItems: "center" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 70,
            width: 70,
            borderRadius: 35, // Half of the height and width to make it circular
            overflow: "hidden", // Ensure the image fits within the circular bounds
            shadowColor: "#333333",

            shadowOffset: {
              width: 0,
              height: 3, // Lower this value for a smaller shadow height
            },
            shadowOpacity: 0.6, // Reduce opacity for a subtler shadow
            shadowRadius: 4, // Reduce radius for a smaller blur effect
            elevation: 10, // Adjust elevation for Android
          }}
        >
          <Image
            source={{ uri: category.urlImage }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40, // Half of the height and width to make it circular
            }}
          />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 9, fontFamily: "roboto-medium", textAlign: "center" }}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
