import React from "react";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";

function OrderingItemList(props: { selectedItems: CartItemsResponseDto[] }) {
  const orderingItems = props.selectedItems;

  const orderItemsList = orderingItems.map((item) => {
    return (
      <div
        style={{
          backgroundColor: "rgba(199, 195, 195, 0.05)",
          height: 150,
          width: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px",
          margin: 10,
          gap: 12,
        }}
        key={item.id}
      >
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
          <p>가격 : {item.price}</p>
          <p>수량 : {item.quantity}</p>
        </div>
        <div style={{ flex: 2 }}>
          <p>총 가격 : {item.totalPrice}</p>
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
