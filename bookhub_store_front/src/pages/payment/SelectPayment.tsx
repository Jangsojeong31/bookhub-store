import React from 'react'
import Checkout from './Checkout'
import type { CartItemsResponseDto } from '../../dtos/cart/CartItemsResponse.dto'

function SelectPayment(props: { selectedItems: CartItemsResponseDto[], finalPrice: number, addressId: number }) {
  const orderingItems = props.selectedItems;
  const totalAmount = props.finalPrice;
  const addressId = props.addressId;

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 15, padding: 0, }}>
      <Checkout orderingItems={orderingItems} totalAmount={totalAmount} addressId={addressId}/>
    </div>
  )
}

export default SelectPayment