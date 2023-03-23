import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

type initialStateType = {
  productList: Product[];
};

const productList: Product[] = [];

const initialState: initialStateType = {
  productList,
};

export default createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.productList.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
      } else {
        state.productList.push(action.payload);
      }
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productList = state.productList.filter((product) => {
        return product.id !== action.payload;
      });
    },

    getAllProduct: (state, action: PayloadAction<Product[]>) => {
      state.productList = [...action.payload];
    },

    resetCart: () => initialState,
  },
});
