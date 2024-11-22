import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of cart items
};

// Tạo slice cho giỏ hàng
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      // Mutate the draft state directly (no reassignment)
      state.items = action.payload;
    },
  },
});
export const { setPayment } = paymentSlice.actions;

// Export the reducer
export default paymentSlice.reducer;
