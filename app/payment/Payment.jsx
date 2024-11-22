import { View, StyleSheet, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useMemo, useState } from "react";
import NavBottom from "../../components/payment/NavBottom";
import Header from "../../components/payment/Header";
import Address from "../../components/payment/Address";
import ListItem from "../../components/payment/ListItem";
import ShippingMethod from "../../components/payment/ShippingMethod";
import Message from "../../components/payment/Message";
import Bill from "../../components/payment/Bill";
import { useSelector } from "react-redux";
import { supabase } from "../../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import WebView from "react-native-webview";
export default function CartScreen() {
  const [orderUrl, setOrderUrl] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false); // Track payment completion

  const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };

  const paymentId = useSelector((state) => state.payment.items);
  const carts = useSelector((state) => state.cart.items);
  const filteredItems = carts.filter((item) => paymentId.includes(item.id));
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const totalPrice = useMemo(() => {
    const total = filteredItems.reduce((total, cart) => {
      return total + cart.total;
    }, 0);
    // Update the cartCheck state with the IDs of checked items
    return total;
  }, [filteredItems]);
  const [medthod, setMethod] = useState(9000);
  const handleOrder = async () => {
    if (paymentMethod === "COD") {
      setLoading(true);
      await addOrder();
      setLoading(false);
      router.replace("/Notification");
    } else {
      makePaymentRequest();
    }
  };

  const makePaymentRequest = async () => {
    const embed_data = {
      promotioninfo: "",
      merchantinfo: "embeddata123",
    };

    const items = [
      {
        itemid: "knb",
        itemname: "kim nguyen bao",
        itemprice: 198400,
        itemquantity: 1,
      },
    ];

    const transID = Math.floor(Math.random() * 1000000);

    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: totalPrice + medthod,
      callback_url: "http://localhost:8081", // Example URL, replace with your actual callback
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: "zalopayapp",
    };

    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      setLoading(true);
      const response = await axios.post(config.endpoint, null, { params: order });
      setLoading(false);
      if (response.data.order_url) {
        setOrderUrl(response.data.order_url);
      } else {
        console.error("Payment request successful but no order_url received.");
      }
    } catch (error) {
      console.error("Error making payment request:", error);
    }
  };

  const onNavigationStateChange = (navState) => {
    // Check if the URL is the success URL
    if (navState.url.includes("returncode=1")) {
      addOrder();
      setLoading(false);
      Alert.alert("Thành công", "Thanh toán thành công!", [{ text: "OK", onPress: () => setOrderUrl("") }]);
      router.replace("/Notification");
    } else if (navState.url.includes("returncode=0")) {
      setLoading(false);
      Alert.alert("Thất bại", "Thanh toán thất bại!", [{ text: "OK", onPress: () => setOrderUrl("") }]);
    }
  };

  const addOrder = async () => {
    try {
      // Step 1: Insert into the Order table
      const { data: orderData, error: orderError } = await supabase
        .from("Order")
        .insert([
          {
            payment_method: paymentMethod,
            total_price: totalPrice + medthod,
            order_status: "Đơn hàng đang được chuẩn bị",
            payment_status: paymentMethod === "COD" ? "Chưa thanh toán" : "Đã thanh toán",
            user_id: Number(await AsyncStorage.getItem("user")),
          },
        ])
        .select(); // This will return the inserted order including the order_id

      if (orderError) throw orderError;

      const orderId = orderData[0].id; // Assuming the first item contains the inserted order and its ID
      const orderItems = filteredItems.map((item) => {
        return {
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
          total_price: item.total,
        };
      });
      console.log(orderItems);
      // Step 2: Insert into the OrderDetail table
      const { data: orderDetailData, error: orderDetailError } = await supabase.from("Order_detail").insert(orderItems);

      if (orderDetailError) throw orderDetailError;

      console.log("Order created successfully with details:", orderData, orderDetailData);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView>
        <Address />
        <ListItem carts={filteredItems} />
        <ShippingMethod priceShip={medthod} />
        <Message paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        <Bill priceShip={medthod} totalPrice={totalPrice} />
      </ScrollView>
      <NavBottom totalPrice={totalPrice + medthod} handleOrder={handleOrder} />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      {!paymentComplete && orderUrl && (
        <WebView
          source={{ uri: orderUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={onNavigationStateChange} // Monitor URL changes
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    paddingVertical: 55,
    paddingTop: 85,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's above other components
  },
});
