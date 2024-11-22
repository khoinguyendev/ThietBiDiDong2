import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import BussyItem from "./BussyItem";
import { supabase } from "../../utils/supabase";

export default function Bussy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("ProductHot")
          .select(
            `
          *,
          Product (
            *,
            Default_selection (
            *
            
          )
          )
          `
          )
          .eq("is_active", true);

        setProducts(data);
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
      <Text style={{ paddingLeft: 20, marginVertical: 10, fontSize: 18, fontFamily: "roboto-bold" }}>Nổi bật</Text>
      <FlatList style={{ backgroundColor: "#ed4f2e", paddingVertical: 10 }} horizontal={true} data={products} renderItem={({ item, index }) => <BussyItem product={item} key={item.id} />} />
    </View>
  );
}
