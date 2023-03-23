import { RootState } from "./store";

export const userDataSelector = (state: RootState) => state.account;

export const cartDataSelector = (state: RootState) => state.cart;
