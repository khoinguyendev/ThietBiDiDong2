import { useDispatch, useSelector } from "react-redux";
import { addToCart, saveCartToStorage } from "../../redux/cartSlice";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import Toast from "react-native-toast-message";

export default function NavBottom({ product, hethang, variantId }) {
  // const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (hethang) {
      Toast.show({
        text2: "Sản phẩm đã hết vui lòng chọn loại khác!",
        text2Style: { color: "red", fontSize: 12, fontWeight: "400" },

        type: "error",
      });
      return;
    }
    let chuoi = variantId ? variantId?.code : "";
    const newProduct = {
      id: product.id.toString() + chuoi,
      productId: product.id,
      name: product.name,
      quantity: 1,
      variant_id: variantId,
      price: product.price,
      price_sale: product.price_sale,
      sale: product.sale,
      image: product.image,
      total: product.sale ? product.price_sale : product.price,
    };
    dispatch(addToCart(newProduct)); // Dispatch action to add the product

    Toast.show({
      text1: "🛸🛸🛸🛸🛸",

      text2: "Đã thêm sản phẩm vào giỏ hàng!",
      text2Style: { color: "green", fontSize: 12, fontWeight: "400" },

      type: "success",
    });
    dispatch(saveCartToStorage()); // Save the updated cart to AsyncStorage
  };

  // UseEffect to update AsyncStorage when cart changes
  // useEffect(() => {
  //   const storeCart = async () => {
  //     await AsyncStorage.setItem("carts", JSON.stringify(cart));
  //   };
  //   storeCart();
  // }, [cart]); // Dependency on cart so it updates in AsyncStorage whenever cart changes

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.navItem, { flex: 1 }, { backgroundColor: "#0e8170" }]}>
        <View style={styles.navText}>
          <AntDesign name="message1" size={25} color="white" />
          <Text style={{ fontSize: 8, color: "white", marginTop: 5 }}>Chat ngay</Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 40, width: 1, backgroundColor: "black" }}></View>

      <TouchableOpacity onPress={handleAddToCart} style={[styles.navItem, { flex: 1 }, { backgroundColor: "#0e8170" }]}>
        <View style={styles.navText}>
          <MaterialIcons name="add-shopping-cart" size={30} color="white" />
          <Text style={{ fontSize: 8, color: "white" }}>Thêm vào giỏ hàng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navItem, { flex: 2 }, { backgroundColor: Colors.PRIMARY }]}>
        <View style={styles.navText}>
          <Text style={{ color: "white", fontSize: 12 }}>Mua ngay</Text>
          {/* <Text style={{ color: "white", fontFamily: "roboto-bold" }}>
            ₫<Text style={{ fontSize: 16 }}>120.000</Text>
          </Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#0e8170",
    flexDirection: "row",
    alignItems: "center",
  },
  navItem: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
