import React from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoIcon from "../../images/logo.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { cartDataSelector, userDataSelector } from "../../redux/selector";
import { setLogoutAccount } from "../../redux/actions";
import CartSlide from "../../slices/CartSlide";
import { HEADER_LINKS } from "../../data";
import "../../scss/Layout.scss";
import { Product } from "../../types";

export default function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector(userDataSelector);
  const cartData = useSelector(cartDataSelector);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  const onClickLogout = () => {
    dispatch(setLogoutAccount());
    navigate("/");
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  const onClickPayment = () => {
    navigate("/payment");
    setAnchorElCart(null);
  };

  const clickDeleteProduct = (id: number) => {
    dispatch(CartSlide.actions.deleteProduct(id));
  };

  return (
    <Box className="container">
      <CssBaseline />
      <AppBar position="fixed" className="appbar">
        <Toolbar className="toolbar">
          <Box className="toolbarLeft">
            <Link className="linkIcon" to={`/`}>
              <img src={LogoIcon} className="imgIcon" alt="logo header" />
            </Link>
            <Box className="pageLinkList">
              {HEADER_LINKS.map((value) => (
                <Link to={value.path} className="pageLinkItem" key={value.id}>
                  <Typography
                    variant="caption"
                    className={
                      location.pathname !== value.path
                        ? "pageName"
                        : "activePageName"
                    }
                  >
                    {value.title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
          <Box className="toolbarRight">
            {/* cart */}
            <Box className="cartIconBox">
              <Tooltip title="Giỏ hàng">
                <IconButton onClick={handleOpenCart} sx={{ p: 0 }}>
                  <ShoppingCartIcon className="cartIcon" />
                </IconButton>
              </Tooltip>
              {cartData?.productList.length > 0 ? (
                <Box className="cartNotice">{cartData.productList.length}</Box>
              ) : (
                <></>
              )}
              <Menu
                sx={{ top: "36px" }}
                id="menu-appbar"
                anchorEl={anchorElCart}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElCart)}
                onClose={handleCloseCart}
              >
                <MenuItem className="cartHeadingBox">
                  <Typography className="cartHeadingTitle">Cart</Typography>
                </MenuItem>
                <Box>
                  {cartData?.productList.length > 0 ? (
                    <>
                      {cartData.productList.map((cartItem: Product) => {
                        return (
                          <MenuItem key={cartItem.id} className="cartItemBox">
                            <Box className="cartItemImageBox">
                              <img
                                src={cartItem.image[0]}
                                alt="cart item"
                                className="cartItemImage"
                              />
                            </Box>
                            <Box className="cartItemInfoBox">
                              <Typography className="cartItemName">
                                {cartItem.nameProduct}
                              </Typography>
                              <Box className="cartItemPriceBox">
                                <Typography className="cartItemPrice">
                                  ${cartItem.salePrice.toFixed(2)} X
                                  {cartItem.quantity}
                                </Typography>
                                <Typography className="cartItemTotalPrice">
                                  {(
                                    cartItem.salePrice * cartItem.quantity
                                  ).toFixed(2)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              className="deleteIconBox"
                              onClick={() => clickDeleteProduct(cartItem.id)}
                            >
                              <IconButton>
                                <DeleteIcon className="deleteIcon" />
                              </IconButton>
                            </Box>
                          </MenuItem>
                        );
                      })}
                      <MenuItem className="paymentButtonBox">
                        <Button
                          variant="contained"
                          className="deleteButton"
                          onClick={onClickPayment}
                        >
                          Thanh toán
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{ height: 200 }}
                    >
                      Không có sản phẩm nào
                    </Stack>
                  )}
                </Box>
              </Menu>
            </Box>

            {/* user || login */}
            {userData.isLogin ? (
              <>
                <Tooltip title={userData.user.name}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={userData.user.name}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={onClickLogout}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {/* login */}
                <Tooltip title="Đăng nhập">
                  <IconButton sx={{ p: 0 }} onClick={onClickLogin}>
                    <LoginIcon className="loginIcon" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="mainContent">
        <Outlet />
      </Box>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}
