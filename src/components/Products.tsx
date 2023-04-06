import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import "../scss/Products.scss";
import { Product } from "../types";

interface ProductsProps {
  data: Product[];
  title: string;
}

export default function Products(props: ProductsProps) {
  return (
    <Box className="productsBox">
      <Typography className="productsTitle">{props.title}</Typography>
      <Grid container spacing={2}>
        {props.data.map((product : Product) => {
          return (
            <Grid key={product.id} item xs={12} lg={3} md={4} sm={6}>
              <Card className="productBox">
                <Link to={`/product/${product.id}`}>
                  <CardMedia
                    component="img"
                    src={product.image[0]}
                    className="productImage"
                  />
                </Link>

                <CardContent className="productInfoBox">
                  <Link to={`/product/${product.id}`} className="productName">
                    {product.nameProduct}
                  </Link>
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography className="productSalePrice">
                      {product.salePrice.toFixed(2)} $
                    </Typography>
                    <Typography className="productPrice">
                      {product.price.toFixed(2)} $
                    </Typography>
                  </Stack>
                </CardContent>

                <Box className="promotion">
                  -{Math.round((product.salePrice / product.price) * 100)}%
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
