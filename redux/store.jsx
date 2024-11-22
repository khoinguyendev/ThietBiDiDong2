import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // import reducer từ slice đã tạo
import paymentSlice from "./paymentSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer, // Tên state là 'cart', có thể thêm các reducers khác tại đây
    payment: paymentSlice,
  },
});

export default store;
