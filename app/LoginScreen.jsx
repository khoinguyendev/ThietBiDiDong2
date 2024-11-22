import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import { supabase } from "../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { Modal } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPScreenVisible, setIsOTPScreenVisible] = useState(false);

  const [loading, setLoading] = useState(false); // Loading state
  const [loadOtp, setLoadOtp] = useState(false); // Loading state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(""); // Error state
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Simulated OTP for now
  const hardcodedOTP = "1234";
  const handleOTPChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }

    if (value.length === 0 && index > 0) {
      otpInputRefs[index - 1].current.focus();
    }
  };

  const handleOTPSubmit = async () => {
    setLoadOtp(true);
    if (otp.join("") === hardcodedOTP) {
      const { data, error } = await supabase.from("User").update({ is_active: true }).eq("phone", email).select();

      if (error) {
        Alert.alert("Lỗi", "Vui lòng thử lại!");
        return;
      }
      setLoadOtp(false);
      Alert.alert("Thành công", "Xác thực tài khoản thành công!");
      setIsOTPScreenVisible(false);
    } else {
      setLoadOtp(false);
      setError("Mã OTP không hợp lệ");
    }
  };

  const hanldeClose = () => {
    setError("");
    setIsOTPScreenVisible(false);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        text2: "Vui lòng nhập đầy đủ thông tin!",
        text2Style: { color: "red", fontSize: 12, fontWeight: "400" },
        type: "error",
      });
      return;
    }

    setLoading(true); // Show loading spinner

    let { data, error } = await supabase.from("User").select("*").eq("phone", email).eq("password", password).single();

    if (error) {
      Toast.show({
        text2: "Thông tin đăng nhập không đúng!",
        text2Style: { color: "red", fontSize: 12, fontWeight: "400" },
        type: "error",
      });
      setLoading(false); // Hide loading spinner
      return;
    }

    if (data) {
      if (data.is_active) {
        await AsyncStorage.setItem("user", JSON.stringify(data.id));
        router.replace("(tabs)/home");
        setLoading(false); // Hide loading spinner after success
      } else {
        setLoading(false); // Hide loading spinner
        setIsOTPScreenVisible(true);
      }
    } else {
      Toast.show({
        text2: "Thông tin đăng nhập không đúng!",
        text2Style: { color: "red", fontSize: 12, fontWeight: "400" },
        type: "error",
      });
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/images/logologin.png")}
          style={{
            width: 350,
            height: 100,
            marginBottom: 70,
            resizeMode: "stretch",
          }}
        />
      </View>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput style={styles.input} placeholder="Số điện thoại" value={email} onChangeText={setEmail} keyboardType="numeric" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupText}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity>
          <Text onPress={() => router.replace("/SignupScreen")} style={styles.signupButton}>
            Đăng kí
          </Text>
        </TouchableOpacity>
      </View>
      {/* OTP Modal */}
      <Modal visible={isOTPScreenVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={hanldeClose} style={{ alignSelf: "flex-end", marginBottom: 10 }}>
              <FontAwesome name="close" size={30} color="red" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: "green", marginBottom: 5 }]}>Tài khoản chưa được xác thực!</Text>
            <Text style={styles.modalTitle}>Vui lòng nhập mã OTP được gửi về số điện thoại để xác thực tài khoản</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={otpInputRefs[index]}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(index, value)}
                />
              ))}
            </View>
            {error && <Text style={[styles.modalTitle, { color: "red", marginBottom: 5 }]}>{error}</Text>}

            <TouchableOpacity style={styles.otpButton} disabled={loadOtp ? true : false} onPress={handleOTPSubmit}>
              {loadOtp ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.buttonText}>Gửi</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Loading Spinner Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    color: "",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-bold",
    fontWeight: "bold",
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Make the background slightly transparent
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
  otpButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
});
