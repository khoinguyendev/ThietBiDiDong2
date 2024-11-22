import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../utils/supabase";

export default function EmojiPicker({ isVisible, children, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/LoginScreen");
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
  };
  useEffect(() => {
    const fetchImage = async () => {
      // Fetch the Base64 image data from Supabase
      const { data, error } = await supabase
        .from("User") // Replace with your table name
        .select("*") // Replace with your column name
        .eq("id", 7)
        .single();
      if (error) {
        console.error("Error fetching image from Supabase:", error.message);
      } else {
        setUser(data);
      }
    };

    fetchImage();
  }, []);
  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true, // Include Base64 data
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImage(result.assets[0]); // Store image data including base64
    }
  };

  const uploadImage = async () => {
    if (!image?.base64) {
      console.error("No Base64 image data found.");
      return;
    }
    const { data, error } = await supabase
      .from("User") // Replace with your table name
      .update({ avatar: image.base64 }) // Save Base64 string to the avatar column
      .eq("id", 7); // Replace with dynamic id as needed
    if (error) {
      console.error("Error saving image to Supabase table:", error.message);
    } else {
      console.log("Image saved to Supabase table with ID:", data[0].id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose Avatar</Text>
      </TouchableOpacity>

      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.avatar} />
          <TouchableOpacity style={styles.button} onPress={uploadImage}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </>
      )}
      {user && <Image source={{ uri: `data:image/jpeg;base64,${user.avatar}` }} style={styles.image} />}
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  button: {
    backgroundColor: "#1c7ed6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
