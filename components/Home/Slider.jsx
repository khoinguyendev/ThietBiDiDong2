import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");
import { Colors } from "../../constants/Colors";

export default function Slider() {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={true} // Tự đ��ng chuyển hình ảnh
        // Hiển thị các nút điều hướng
        autoplay={true} // Tự động chuyển hình ảnh
        activeDotStyle={styles.activeDot} // Style cho nút tròn active
        autoplayTimeout={7} // Thời gian chờ giữa các hình ảnh
      >
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{
              uri: "https://newsmd2fr.keeng.vn/tiin/archive/imageslead/2022/08/07/90_b42159f65e45554ade3a8e248c7b2e23.jpg",
            }}
            onError={() => console.log("Failed to load image 1")} // Kiểm tra lỗi khi tải ảnh
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{
              uri: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/Banner-Genshin-Impact-5.jpg",
            }}
            onError={() => console.log("Failed to load image 1")} // Kiểm tra lỗi khi tải ảnh
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{
              uri: "https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?auto=webp&s=8b871c713fdb41aaf0c08702857ba0e8464534cf",
            }}
            onError={() => console.log("Failed to load image 1")} // Kiểm tra lỗi khi tải ảnh
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn.tgdd.vn/Files/2023/06/02/1532644/thegioididong-dac-biet-tgdd-3123123123-3-020623-160223-800-resize.jpg",
            }}
            onError={() => console.log("Failed to load image 2")} // Kiểm tra lỗi khi tải ảnh
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{
              uri: "https://salt.tikicdn.com/ts/brickv2og/c0/f4/20/333a4bf61378b404f0ca015332b85d12.png",
            }}
            onError={() => console.log("Failed to load image 3")} // Kiểm tra lỗi khi tải ảnh
          />
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: 200, // Đảm bảo chiếm toàn bộ không gian
  },
  wrapper: {
    height: 200, // Chiều cao của slider
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 1, // Chiều rộng của hình ảnh
    height: 200, // Chiều cao của hình ảnh
    resizeMode: "stretch",
  },
  activeDot: {
    backgroundColor: Colors.PRIMARY, // Màu của nút tròn active
  },
});
