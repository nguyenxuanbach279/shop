import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../types";

type initialStateType = {
  isLogin: Boolean;
  user: UserData;
};

const initialState: initialStateType = {
  isLogin: false,
  user: {
    id: 0,
    username: "",
    password: "",
    name: "",
    phone: "",
    cart: [],
  },
};

export default createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
});
