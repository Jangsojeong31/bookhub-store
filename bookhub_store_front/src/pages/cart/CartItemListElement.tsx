import React, { useState } from "react";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";
import { decreaseQuantity, increaseQuantity, removeCartItems } from "../../apis/cart";
import { useCookies } from "react-cookie";
import useToken from "../../hooks/useToken";
import type { RemoveCartItemRequestDto } from "../../dtos/cart/RemoveCartItemRequest.dto";

interface ElementProps {
  cartItemList: CartItemsResponseDto[];
  selectedItems: CartItemsResponseDto[];
  onSelectionChange: (selected: CartItemsResponseDto[]) => void;
  onRemoveItem: (id: number) => void;
}

function CartItemListElement({
  cartItemList,
  selectedItems,
  onSelectionChange,
  onRemoveItem
}: ElementProps) {
  const token = useToken();

  const onDecreseQuantity = async (id: number) => {
    await decreaseQuantity(id, token);
  };

  const onIncreaseQuantity = async (id: number) => {
    await increaseQuantity(id, token);
  };

  const handleCheckboxChange = (item: CartItemsResponseDto) => {
    const isSelected = selectedItems.some((i) => i.id === item.id);
    let updated;
    if (isSelected) {
      updated = selectedItems.filter((i) => i.id !== item.id);
    } else {
      updated = [...selectedItems, item];
    }
    onSelectionChange(updated);
  };

  const handleRemoveCartItem = async(id: number) => {
    const dto: RemoveCartItemRequestDto = { cartItemIds: [id] }
    await removeCartItems(dto, token);
    onRemoveItem(id);
  }

  const cartItemListResult = cartItemList.map((item) => {
    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          height: 200,
          width: 1100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px",
          margin: 10,
          gap: 12,
        }}
        key={item.id}
      >
        <input
          type="checkbox"
          checked={selectedItems.some((i) => i.id === item.id)}
          onChange={() => handleCheckboxChange(item)}
        />

        <div
          style={{
            border: "1px solid black",
            aspectRatio: "3.5/5",
            height: "90%",
          }}
        >
          <p>표지</p>
        </div>
        <div style={{ flex: 2 }}>
          <p>{item.title}</p>
          <p>{item.price}</p>
        </div>
        <div style={{ flex: 2 }}>
          <p>총 가격 : {item.totalPrice}</p>
          <button onClick={() => onDecreseQuantity(item.id)}>-</button>
          {item.quantity}
          <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
        </div>
        <div style={{ marginBottom: "auto" }}>
          <button onClick={() => handleRemoveCartItem(item.id)}>삭제</button>
        </div>
      </div>
    );
  });

  return <>{cartItemListResult}</>;
}

export default CartItemListElement;
