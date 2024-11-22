import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of cart items
};

// Tạo slice cho giỏ hàng
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // Mutate the draft state directly (no reassignment)
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (productIndex !== -1) {
        // Increase quantity if product already exists
        if (state.items[productIndex].variant_id.id === action.payload.variant_id.id) {
          state.items[productIndex].quantity += 1;
          state.items[productIndex].total += action.payload.price;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      } else {
        // Add new product to cart
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Remove item by id (modify the existing state)
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.id === action.payload);
      if (productIndex !== -1) {
        state.items[productIndex].quantity += 1;
        const price = state.items[productIndex].sale ? state.items[productIndex].price_sale : state.items[productIndex].price;
        state.items[productIndex].total = (state.items[productIndex].total || 0) + price;
      }
    },
    decrementQuantity: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.id === action.payload);
      if (productIndex !== -1) {
        if (state.items[productIndex].quantity > 1) {
          state.items[productIndex].quantity -= 1;
          const price = state.items[productIndex].sale ? state.items[productIndex].price_sale : state.items[productIndex].price;
          state.items[productIndex].total = (state.items[productIndex].total || 0) - price;
        } else {
          // Optionally remove the item if quantity reaches 0
          state.items.splice(productIndex, 1);
        }
      }
    },
  },
});

// Thunks to handle AsyncStorage side effects
export const saveCartToStorage = () => async (dispatch, getState) => {
  const state = getState();
  await AsyncStorage.setItem("carts", JSON.stringify(state.cart.items));
};

// Export actions
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
