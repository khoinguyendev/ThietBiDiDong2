import { View, Text, Image, Dimensions, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Rating from "../../components/ProductDetail/Rating";
import DetailProduct from "../../components/ProductDetail/DetailProduct";
import RelationProduct from "../../components/ProductDetail/RelationProduct";
import NavBottom from "../../components/ProductDetail/NavBottom";
import { supabase } from "../../utils/supabase";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../components/ProductDetail/Header";
import SlideImage from "../../components/ProductDetail/SlideImage";
const { width } = Dimensions.get("window");

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState([]);
  const [hethang, setHetHang] = useState(false);
  const [productRelation, setProductRelation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productVariant, setProductVariant] = useState(null);
  const [color, setColor] = useState([]);
  const [config, setConfig] = useState([]);
  const [size, setSize] = useState([]);
  const [variantId, setVariantId] = useState(null);
  const [value, setValue] = useState({ color: null, size: null, config: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("Product").select("*").eq("id", id);
        const { data: relation, error: relationError } = await supabase.from("Product").select("*").eq("category_id", data[0].category_id).neq("id", id);
        const { data: variant, error: variantError } = await supabase.from("Product_variant").select("*").eq("product_id", id);
        let productOption = {};
        if (data[0].Default_selection) {
          productOption = variant.find((item) => item.id == data[0].Default_selection);
          if (productOption) {
            data[0].price = productOption.price;
            setVariantId(productOption);
          }
        }
        setProduct(data[0]);
        setProductRelation(relation);
        setProductVariant(variant);

        let colorFake = [];
        let configFake = [];
        let sizeFake = [];

        variant.forEach((item) => {
          if (item.color && !colorFake.includes(item.color)) {
            colorFake.push(item.color);
          }
          if (item.configuration && !configFake.includes(item.configuration)) {
            configFake.push(item.configuration);
          }
          if (item.size && !sizeFake.includes(item.size)) {
            sizeFake.push(item.size);
          }
        });

        if (colorFake.length > 0) {
          if (productOption) {
            setValue((prevState) => ({ ...prevState, color: colorFake.indexOf(productOption.color) }));
          } else {
            setValue((prevState) => ({ ...prevState, color: 0 }));
          }
          setColor(colorFake);
        }
        if (configFake.length > 0) {
          if (productOption) {
            setValue((prevState) => ({ ...prevState, config: configFake.indexOf(productOption.configuration) }));
          } else {
            setValue((prevState) => ({ ...prevState, config: 0 }));
          }
          setConfig(configFake);
        }
        if (sizeFake.length > 0) {
          if (productOption) {
            setValue((prevState) => ({ ...prevState, size: sizeFake.indexOf(productOption.size) }));
          } else {
            setValue((prevState) => ({ ...prevState, size: 0 }));
          }
          setSize(sizeFake);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChangeVariant = (key, index) => {
    // Update the value for the selected attribute
    setValue((prevState) => {
      // Prepare updated values based on the change
      const updatedValue = { ...prevState, [key]: index };

      // Use updated values to find the matching variant
      const matchingVariant = productVariant.find((variant) => {
        const selectedColor = updatedValue.color !== null ? color[updatedValue.color] : null;
        const selectedConfig = updatedValue.config !== null ? config[updatedValue.config] : null;
        const selectedSize = updatedValue.size !== null && size.length > 0 ? size[updatedValue.size] : null;

        const matchesColor = selectedColor ? variant.color === selectedColor : true;
        const matchesConfig = selectedConfig ? variant.configuration === selectedConfig : true;
        const matchesSize = selectedSize ? variant.size === selectedSize : true;

        // Return the first matching variant
        return matchesColor && matchesConfig && matchesSize;
      });

      // Update the product price with the matching variant price (if found)
      if (matchingVariant) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          price: matchingVariant.price,
        }));
        setVariantId(matchingVariant);
        setHetHang(false);
      } else {
        // If no matching variant found, reset the color, config, and size selections
        setVariantId(null);
        setHetHang(true);
      }

      // Return the updated state
      return updatedValue;
    });
  };

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
    <>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <SlideImage images={product.image_array} />
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={{ fontSize: 13, color: "white", fontWeight: "bold", textAlign: "center" }}>{product?.name}</Text>
          </View>

          {color.length > 0 && (
            <View style={{ padding: 10, flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 9 }}>Màu sắc:</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {color.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChangeVariant("color", index)}
                    style={{ height: 30, width: 30, borderRadius: 30, position: "relative", backgroundColor: item, borderColor: Colors.PRIMARY, borderWidth: 1 }}
                  >
                    {value.color === index && <FontAwesome style={{ position: "absolute", top: -5, right: -5 }} name="check" size={20} color={Colors.PRIMARY} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {config.length > 0 && (
            <View style={{ padding: 10, flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 9 }}>Bộ nhớ:</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {config.map((item, index) => (
                  <TouchableOpacity key={index} style={{ position: "relative" }} onPress={() => handleChangeVariant("config", index)}>
                    <Text style={{ color: "white", position: "relative", fontSize: 9, borderColor: "#2f80ed", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                      {item}
                    </Text>
                    {value.config === index && <FontAwesome style={{ position: "absolute", top: -8, right: -5 }} name="check" size={20} color={Colors.PRIMARY} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {size.length > 0 && (
            <View style={{ padding: 10, flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 9 }}>Size:</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {size.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleChangeVariant("size", index)} style={{ position: "relative" }}>
                    <Text style={{ color: "white", position: "relative", fontSize: 9, borderColor: "#2f80ed", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                      {item}
                    </Text>
                    {value.size === index && <FontAwesome style={{ position: "absolute", top: -8, right: -5 }} name="check" size={20} color={Colors.PRIMARY} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          <View style={{ paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
              {hethang ? (
                <Text style={{ color: Colors.PRIMARY }}>Sản phẩm hiện tại đã hết</Text>
              ) : (
                <>
                  {/* Display the sale price if applicable, otherwise display the regular price */}
                  <Text style={{ color: Colors.PRIMARY }}>
                    ₫<Text style={{ fontSize: 20, fontFamily: "roboto-bold" }}>{product.sale ? product?.price_sale.toLocaleString("vi-VN") : product?.price.toLocaleString("vi-VN")}</Text>
                  </Text>

                  {/* If the product is on sale, show the original price with a strike-through and an image */}
                  {product.sale && (
                    <>
                      <View style={{ justifyContent: "flex-end" }}>
                        <Image
                          source={require("../../assets/images/voucher.png")}
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 12,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ₫{product?.price.toLocaleString("vi-VN")}
                      </Text>
                    </>
                  )}
                </>
              )}
            </View>
            <Text style={{ color: "white", fontSize: 10 }}>Đã bán {product?.sold_quantity}</Text>
          </View>
          <View style={{ paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="truck" size={18} color="#0e8170" />
              <Text style={{ color: "white", fontSize: 11 }}>Nhận hàng vào ngày 19 Tháng 9 - 21 Tháng 9</Text>
            </View>
            <AntDesign name="right" size={15} color="gray" />
          </View>
          <View style={{ paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Ionicons name="shield-checkmark-outline" size={15} color={Colors.PRIMARY} />
              <Text style={{ color: "white", fontSize: 11 }}>Combo giảm sâu - Miễn phí vận chuyển</Text>
            </View>
            <AntDesign name="right" size={15} color="gray" />
          </View>
          <View style={{ paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Ionicons name="wallet-outline" size={15} color={Colors.PRIMARY} />
              <Text style={{ color: "white", fontSize: 11 }}>SpayLater: Mua trước trả sau</Text>
            </View>
            <AntDesign name="right" size={15} color="gray" />
          </View>
          <View style={{ height: 10, backgroundColor: "#212121" }}></View>
          <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: "white", fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>Đánh giá sản phẩm</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                <FontAwesome name="star" size={16} color="orange" />
                <FontAwesome name="star" size={16} color="orange" />
                <FontAwesome name="star" size={16} color="orange" />
                <FontAwesome name="star" size={16} color="orange" />
                <FontAwesome name="star-half-empty" size={16} color="orange" />
                <Text style={{ color: Colors.PRIMARY, fontSize: 12, marginLeft: 3 }}>{product?.rating}/5</Text>
                <Text style={{ color: "gray", fontSize: 12, marginLeft: 3 }}>(8 đánh giá)</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Text style={{ color: Colors.PRIMARY, fontSize: 10 }}>Xem tất cả</Text>
              <Ionicons name="chevron-forward-outline" size={16} color={Colors.PRIMARY} />
            </View>
          </View>
          <Rating />
          <View style={{ height: 10, backgroundColor: "#212121" }}></View>
          <DetailProduct detail={product.detail} />
          <View style={{ height: 10, backgroundColor: "#212121" }}></View>
          <RelationProduct products={productRelation} />
        </View>
      </ScrollView>
      <NavBottom product={product} hethang={hethang} variantId={variantId} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 85,
    backgroundColor: "black",
    paddingBottom: 70,
  },

  input: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  signupText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Màu chữ
    fontSize: 18,
    fontFamily: "roboto-bold", // Font chữ
    fontWeight: "bold", // Nếu không load được font, có thể dùng thuộc tính này
  },
  buttonLogin: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 99,
    alignItems: "center",
  },
  signupButton: {
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
