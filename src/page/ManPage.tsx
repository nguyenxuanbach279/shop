import React from "react";
import Products from "../components/Products";
import { PRODUCT_MAN } from "../data";

export default function ManPage() {
  return <Products title="Giày nam" data={PRODUCT_MAN} />;
}
