import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import "../scss/LoginPage.scss";
import { USER_DATA } from "../data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPageSlice from "../slices/LoginPageSlice";
import CartSlide from "../slices/CartSlide";
import { UserData } from "../types";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onchangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clickLogin = () => {
    let hasUser = false;
    USER_DATA.forEach((user : UserData) => {
      if (user.username === username && user.password === password) {
        hasUser = true;
        dispatch(LoginPageSlice.actions.setUserInfo(user));
        dispatch(CartSlide.actions.getAllProduct(user.cart));
        return;
      }
    });
    if (hasUser) navigate("/");
  };

  return (
    <Box className="loginContainer">
      <Box className="loginBox">
        <form>
          <FormGroup className="formGroup">
            <FormControl>
              <InputLabel htmlFor="my-input">Tên tài khoản</InputLabel>
              <Input type="text" id="my-input1" onChange={onchangeUserName} />
            </FormControl>
          </FormGroup>
          <FormGroup className="formGroup">
            <FormControl>
              <InputLabel htmlFor="my-input">Mật khẩu</InputLabel>
              <Input
                type="password"
                id="my-input2"
                onChange={onchangePassword}
              />
            </FormControl>
          </FormGroup>
          <Button variant="contained" className="loginBtn" onClick={clickLogin}>
            Đăng nhập
          </Button>
        </form>
      </Box>
    </Box>
  );
}
