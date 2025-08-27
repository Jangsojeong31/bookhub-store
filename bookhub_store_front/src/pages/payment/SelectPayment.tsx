import React from 'react'
import Checkout from './Checkout'
import type { CartItemsResponseDto } from '../../dtos/cart/CartItemsResponse.dto'

function SelectPayment(props: { selectedItems: CartItemsResponseDto[], finalPrice: number, addressId: number }) {
  const orderingItems = props.selectedItems;
  const totalAmount = props.finalPrice;
  const addressId = props.addressId;

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 15 }}>
      <h3 style={{margin: 20}}><Checkout orderingItems={orderingItems} totalAmount={totalAmount} addressId={addressId}/></h3>
    </div>
  )
}

export default SelectPayment