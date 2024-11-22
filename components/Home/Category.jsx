import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import CategoryItem from "./CategoryItem"; // Đảm bảo rằng bạn có component CategoryItem
import { supabase } from "../../utils/supabase";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("Category").select("*");

        setCategory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
    <View>
      <Text style={{ paddingLeft: 20, marginTop: 10, fontSize: 18, fontFamily: "roboto-bold" }}>Danh mục</Text>
      <FlatList horizontal={true} data={category} renderItem={({ item }) => <CategoryItem category={item} key={item.id} />} keyExtractor={(item) => item.id} />
    </View>
  );
}
