import React from "react";
import Products from "../components/Products";
import { PRODUCT_MAN, PRODUCT_WOMAN } from "../data";

export default function HomePage() {
  return (
    <>
      <Products title="Giày nam" data={PRODUCT_MAN} />
      <Products title="Giày nữ" data={PRODUCT_WOMAN} />
    </>
  );
}
