import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, Image, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

export default function SlideImage({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.text}>
        {currentIndex + 1}/{images.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width, // Ensure the container takes the full width
    backgroundColor: "white",
    paddingBottom: 15,
    position: "relative",
  },
  imageContainer: {
    width: width, // Ensure each image container takes the full screen width
    padding: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // Make sure the image fits the container width
    height: 350,
    resizeMode: "cover", // Adjust this if you want a different fit
  },
  text: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    right: 20,
    fontSize: 12,
  },
});
