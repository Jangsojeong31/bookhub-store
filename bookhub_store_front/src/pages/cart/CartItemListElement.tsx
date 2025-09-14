import React, { useState } from "react";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItems,
} from "../../apis/cart";
import useToken from "../../hooks/useToken";
import type { RemoveCartItemRequestDto } from "../../dtos/cart/RemoveCartItemRequest.dto";
import styles from "./Cart.module.css";

interface ElementProps {
  cartItemList: CartItemsResponseDto[];
  selectedItems: CartItemsResponseDto[];
  onSelectionChange: (selected: CartItemsResponseDto[]) => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

function CartItemListElement({
  cartItemList,
  selectedItems,
  onSelectionChange,
  onRemoveItem,
  onUpdateQuantity,
}: ElementProps) {
  const token = useToken();

  const onDecreseQuantity = async (id: number, quantity: number) => {
    await decreaseQuantity(id, token);

    if (quantity > 1) {
      // 0개 이하 방지
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const onIncreaseQuantity = async (id: number, quantity: number) => {
    await increaseQuantity(id, token);
    onUpdateQuantity(id, quantity + 1);
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

  const handleRemoveCartItem = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    const dto: RemoveCartItemRequestDto = { cartItemIds: [id] };
    await removeCartItems(dto, token);
    onRemoveItem(id);
  };

  const cartItemListResult = cartItemList.map((item) => {
    return (
      <div className={styles.cartItemContainer} key={item.id}>
        <input
          type="checkbox"
          checked={selectedItems.some((i) => i.id === item.id)}
          onChange={() => handleCheckboxChange(item)}
        />

        <div className={styles.bookCover}>
          <img src={item.coverImageUrl} alt={item.title} />
        </div>

        <div className={styles.title}>
          <p><strong style={{color: "black"}}>{item.title}</strong></p>
          <span><strong>가격</strong></span>
          <span className={styles.originalPrice}>{item.price}원</span>
          <span>{item.discountedPrice}원</span>
        </div>

        <div className={styles.totalPrice}>
          <p><strong>총 가격</strong>{item.totalPrice} 원</p>
          <div>

          <button onClick={() => onDecreseQuantity(item.id, item.quantity)}>
            –
          </button>
          <p>{item.quantity}</p>
          <button onClick={() => onIncreaseQuantity(item.id, item.quantity)}>
            +
          </button>
          </div>
        </div>

        <button
          onClick={() => handleRemoveCartItem(item.id)}
          className={styles.deleteButton}
        >
          ⨉
        </button>
      </div>
    );
  });

  return <>{cartItemListResult}</>;
}

export default CartItemListElement;
