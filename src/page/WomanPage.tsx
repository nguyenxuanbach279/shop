import React from 'react'
import Products from '../components/Products';
import { PRODUCT_WOMAN } from '../data';

export default function WomanPage() {
  return (
    <Products title="Giày nữ" data={PRODUCT_WOMAN} />
  )
}
