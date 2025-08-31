import React from "react";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";

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
          style={{
            border: "1px solid black",
            aspectRatio: "3.5/5",
            height: "90%",
          }}
        >
          <p>표지</p>
        </div>
        <div style={{ flex: 2 }}>
          <p><strong>{item.title}</strong></p>
          <p>가격 : {item.price}</p>
          <p>수량 : {item.quantity}</p>
        </div>
        <div style={{ marginLeft: "auto"}}>
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
