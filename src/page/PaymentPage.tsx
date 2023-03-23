import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Stack,
  Button,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import "../scss/PaymentPage.scss";
import { cartDataSelector } from "../redux/selector";
import PlusIcon from "../images/icon-plus.svg";
import MinusIcon from "../images/icon-minus.svg";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CartSlide from "../slices/CartSlide";
import { Product } from "../types";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const cartData = useSelector(cartDataSelector);

  const totalPrice = useMemo(() => {
    const result = cartData.productList.reduce((result: number, prod: Product) => {
      return result + prod.salePrice * prod.quantity;
    }, 0);
    return result;
  }, [cartData]);

  const minusQuantity = (item: Product) => {
    if (item.quantity > 1) {
      const minusProduct = { ...item, quantity: -1 };
      dispatch(CartSlide.actions.addProduct(minusProduct));
    } else {
      dispatch(CartSlide.actions.deleteProduct(item.id));
    }
  };

  const plusQuantity = (item: Product) => {
    const plusProduct = { ...item, quantity: 1 };
    dispatch(CartSlide.actions.addProduct(plusProduct));
  };

  const clickDeleteProduct = (id: number) => {
    dispatch(CartSlide.actions.deleteProduct(id));
  };

  const onClickPayment = () => {
    dispatch(CartSlide.actions.resetCart());
  };

  return (
    <Box className="paymentPageBox">
      <Typography className="paymentPageTitle">Giỏ hàng</Typography>
      {cartData?.productList.length > 0 ? (
        <>
          <Table className="tableProduct">
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="center">Đơn giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Số tiền</TableCell>
                <TableCell align="center">Xóa sản phẩm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartData?.productList.map((item: Product) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        columnGap={2}
                      >
                        <Box className="imgBox">
                          <img src={item.image[0]} alt="img"></img>
                        </Box>
                        <Typography>{item.nameProduct}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        columnGap={1}
                        justifyContent="center"
                      >
                        <Typography className="productPrice">
                          {item.price.toFixed(2)} $
                        </Typography>
                        <Typography className="productSalePrice">
                          {item.salePrice.toFixed(2)} $
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        columnGap={1}
                      >
                        <Button
                          className="descrease-btn"
                          onClick={() => minusQuantity(item)}
                        >
                          <img src={MinusIcon} alt="-" />
                        </Button>
                        <Box className="quantity">{item.quantity}</Box>
                        <Button
                          className="increase-btn"
                          onClick={() => plusQuantity(item)}
                        >
                          <img src={PlusIcon} alt="+" />
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 18, userSelect: "none" }}
                    >
                      {(item.salePrice * item.quantity).toFixed(2)}$
                    </TableCell>
                    <TableCell align="center">
                      <Box onClick={() => clickDeleteProduct(item.id)}>
                        <IconButton>
                          <DeleteIcon className="deleteIcon" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            columnGap={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              sx={{ width: 200 }}
              onClick={onClickPayment}
            >
              Thanh Toán
            </Button>
            <Typography className="totalPrice">
              Thành tiền: {totalPrice.toFixed(2)}$
            </Typography>
          </Stack>
        </>
      ) : (
        <>
          <Stack justifyContent="center" alignItems="center">
            <Typography>Không có sản phẩm trong giỏ hàng</Typography>
          </Stack>
        </>
      )}
    </Box>
  );
}
