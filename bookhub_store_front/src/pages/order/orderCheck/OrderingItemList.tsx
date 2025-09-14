import React from "react";
import type { CartItemsResponseDto } from "../../../dtos/cart/CartItemsResponse.dto";
import styles from "./OrderCheckPage.module.css"

function OrderingItemList(props: { selectedItems: CartItemsResponseDto[] }) {
  const orderingItems = props.selectedItems;

  const orderItemsList = orderingItems.map((item) => {
    return (
      <div
        style={{
          backgroundColor: "#cccccc1e",
          height: 150,
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          margin: "20px auto",
          gap: 20,
        }}
        key={item.id}
      >
        <div
          className={styles.cover}
        >
          <img src={item.coverImageUrl} alt={item.title}/>
        </div>
        <div style={{ flex: 2 }}>
          <p><strong>{item.title}</strong></p>
          <span style={{marginRight: 5, color: "#0b492ece"}}><strong>가격</strong></span>
          <span className={styles.orginalPrice}>{item.price}원</span>
          <span>{item.discountedPrice}원</span>
          <p ><strong style={{marginRight: 5, color: "#0b492ece"}}>수량 </strong>{item.quantity}</p>
        </div>
        <div style={{ marginLeft: "auto"}}>
          <p><strong style={{marginRight: 5, color: "#0b492ece"}}>총 가격</strong>{item.totalPrice}원</p>
        </div>
      </div>
    );
  });

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 15 }}>
      <h3 style={{margin: 20}}>주문 상품</h3>
      {orderItemsList}
    </div>
  );
}

export default OrderingItemList;
