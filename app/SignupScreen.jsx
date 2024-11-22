import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert, ActivityIndicator } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import { supabase } from "../utils/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOTPScreenVisible, setIsOTPScreenVisible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phoneError, setPhoneError] = useState(""); // Error for phone number
  const [passwordError, setPasswordError] = useState(""); // Error for password
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Error for confirm password
  const [loading, setLoading] = useState(false); // Loading state
  const [loadOtp, setLoadOtp] = useState(false); // Loading state
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Simulated OTP for now
  const hardcodedOTP = "1234";

  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(email)) {
      setPhoneError("Số điện thoại phải là 10 chữ số hợp lệ.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6 || password.length > 15) {
      setPasswordError("Mật khẩu phải từ 6 đến 15 kí tự.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSignUp = async () => {
    const isPhoneValid = validatePhoneNumber();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    if (!isPhoneValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    setLoading(true);
    const { data: data2, error: error2 } = await supabase.from("User").select("*").eq("phone", email).single();
    if (data2) {
      setPhoneError("Số điện thoại đã được đăng kí");
      setLoading(false);
      console.log("a");
      return;
    }
    console.log("b");
    const { data, error } = await supabase
      .from("User")
      .insert([{ phone: email, password: password }])
      .select();
    if (error) {
      setLoading(false);
      return;
    }

    setIsOTPScreenVisible(true);
    setLoading(false);
  };

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
      router.replace("/LoginScreen");
    } else {
      setLoadOtp(false);
      Alert.alert("Lỗi", "Mã OTP không hợp lệ vui lòng thử lại!");
    }
  };

  const hanldeClose = () => {
    setIsOTPScreenVisible(false);
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
      <Text style={styles.title}>Đăng kí ngay!</Text>

      <TextInput style={styles.input} placeholder="Số điện thoại" value={email} onChangeText={setEmail} onBlur={validatePhoneNumber} keyboardType="number-pad" autoCapitalize="none" />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

      <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} onBlur={validatePassword} secureTextEntry />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" value={confirmPassword} onChangeText={setConfirmPassword} onBlur={validateConfirmPassword} secureTextEntry />
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <TouchableOpacity style={styles.buttonLogin} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng kí</Text>
      </TouchableOpacity>

      <View style={styles.signupText}>
        <Text>Bạn đã có tài khoản? </Text>
        <Link href={"/LoginScreen"}>
          <Text style={styles.signupButton}>Đăng nhập</Text>
        </Link>
      </View>

      {/* OTP Modal */}
      <Modal visible={isOTPScreenVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={hanldeClose} style={{ alignSelf: "flex-end", marginBottom: 10 }}>
              <FontAwesome name="close" size={30} color="red" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: "green", marginBottom: 5 }]}>Đăng kí tài khoản thành công! </Text>
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  signupText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Make the background slightly transparent
    justifyContent: "center",
    alignItems: "center",
  },
});
