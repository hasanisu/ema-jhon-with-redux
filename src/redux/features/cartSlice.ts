import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItem: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product: any) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.selectedItem = slectSelectedItems(state);
      state.totalPrice = slectToalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    updateQuantity: (state: any, action) => {
      const products = state.products.map((product: any) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement") {
            product.quantity -= 1;
          }
        }
        return product;
      });
      state.products = products.filter((product) => product.quantity >= 0);

      state.selectedItem = slectSelectedItems(state);
      state.totalPrice = slectToalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.selectedItem = slectSelectedItems(state);
      state.totalPrice = slectToalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
  },
});

//Selected Items

export const slectSelectedItems = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return Number(total + product.quantity);
  }, 0);

export const slectToalPrice = (state: any) =>
  state.products.reduce((total: number, product: any) => {
    return Number(total + product.quantity * product.price);
  }, 0);

export const selectTax = (state: any) => slectToalPrice(state) * state.taxRate;

export const selectGrandTotal = (state: any) => {
  return slectToalPrice(state) + slectToalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
