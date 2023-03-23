import React, { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import PlusIcon from "../images/icon-plus.svg";
import MinusIcon from "../images/icon-minus.svg";
import CartIcon from "../images/icon-cart-btn.svg";
import "../scss/DetailProductPage.scss";
import { useParams } from "react-router-dom";
import { ALL_PRODUCT } from "../data";
import { useDispatch } from "react-redux";
import CartSlide from "../slices/CartSlide";
import { ToastContainer, toast } from "react-toastify";

export default function DetailProductPage() {
  const dispatch = useDispatch();
  const params = useParams();
  let id: number = Number(params.id);
  const [active, setActive] = useState(0);
  const [quantityProduct, setQuantityProduct] = useState(0);

  const clickActiveImg = (index: number) => {
    setActive(index);
  };

  const minusQuantity = () => {
    if (quantityProduct > 0) {
      let temp: number = quantityProduct;
      temp--;
      setQuantityProduct(temp);
    }
  };

  const plusQuantity = () => {
    let temp: number = quantityProduct;
    temp++;
    setQuantityProduct(temp);
  };

  const clickAddToCart = () => {
    if (quantityProduct > 0) {
      const newProduct = {
        id: ALL_PRODUCT[id - 1].id,
        nameProduct: ALL_PRODUCT[id - 1].nameProduct,
        image: ALL_PRODUCT[id - 1].image,
        salePrice: ALL_PRODUCT[id - 1].salePrice,
        price: ALL_PRODUCT[id - 1].price,
        quantity: quantityProduct,
        description: ALL_PRODUCT[id - 1].description,
      };
      dispatch(CartSlide.actions.addProduct(newProduct));
      setQuantityProduct(0);
    }
    else{
     toast.error("Thêm số lượng sản phẩm")
    }
  };

  return (
    <Box className="detail-product-box">
      <Box className="img-box">
        <Box className="big-img-box">
          <img
            src={ALL_PRODUCT[id - 1].image[active]}
            alt="product"
            className="big-img"
          />
        </Box>
        <Box className="list-small-img-box">
          {ALL_PRODUCT[id - 1].image.map((img, index) => {
            return (
              <Box
                className={
                  active === index ? "small-img-box active" : "small-img-box"
                }
                key={index}
                onClick={() => clickActiveImg(index)}
              >
                <img src={img} alt="img" className="img-small" />
                <span></span>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="product-info-box">
        <Typography className="brand-name">Sneaker company</Typography>
        <Typography className="product-name">
          {ALL_PRODUCT[id - 1].nameProduct}
        </Typography>
        <Typography className="product-desc">
          {ALL_PRODUCT[id - 1].description}
        </Typography>
        <Box className="price-box">
          <Box className="sale-price-box">
            <Typography className="sale-price">
              {ALL_PRODUCT[id - 1].salePrice.toFixed(2)}$
            </Typography>
            <Typography className="promotion">
              {Math.round(
                (ALL_PRODUCT[id - 1].salePrice / ALL_PRODUCT[id - 1].price) *
                  100
              )}
              %
            </Typography>
          </Box>
          <Typography className="price">
            {ALL_PRODUCT[id - 1].price.toFixed(2)}$
          </Typography>
        </Box>
        <Box className="product-info-btn-box">
          <Box className="quantity-box">
            <Button className="descrease-btn" onClick={minusQuantity}>
              <img src={MinusIcon} alt="-" />
            </Button>
            <Box className="quantity">{quantityProduct}</Box>
            <Button className="increase-btn" onClick={plusQuantity}>
              <img src={PlusIcon} alt="+" />
            </Button>
          </Box>
          <Box className="add-to-cart-box">
            <Button
              className="add-to-cart-btn"
              onClick={() => clickAddToCart()}
            >
              <img src={CartIcon} alt="cart btn" />
              <Typography>Add to cart</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
