import { AccountData, Product } from "../types";

export const setUserInfo = (data: AccountData) => {
  return {
    type: "account/setUserInfo",
    payload: data,
  };
};

export const setLogoutAccount = () => {
  return {
    type: "account/setLogoutAccount",
  };
};

export const addProduct = (data: Product) => {
  return {
    type: "cart/addProduct",
    payload: data,
  };
};

export const deleteProduct = (id: number) => {
  return {
    type: "cart/deleteProduct",
    payload: id,
  };
};

export const getAllProduct = (data: Product[]) => {
  return {
    type: "cart/getAllProduct",
    payload: data,
  };
};

export const resetCart = () => {
  return {
    type: "cart/resetCart",
  };
};
