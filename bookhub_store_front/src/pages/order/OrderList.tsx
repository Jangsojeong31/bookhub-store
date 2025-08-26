import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import type { OrderListResponseDto } from "../../dtos/order/OrderListResponse.dto";
import { useNavigate } from "react-router-dom";

function OrderList(props: { orderList: OrderListResponseDto[] }) {
  const orderList = props.orderList;
  const navigation = useNavigate();

  const onNaviOrderDetail = (order: OrderListResponseDto) => {
    navigation("/mypage/order-list/detail", {
      state: {
        order
      },
    });
  }

  const orderListResult = orderList.map((item) => {
      const [datePart] = item.orderDate.split("T");
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: 1300,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px",
          margin: 20,
          gap: 12,
        }}
        key={item.orderId}
      >
        <div style={{ flex: 2 }}>
          <span><strong>{datePart}</strong></span>
          <span>{item.status}</span>
          <p>{item.orderName}</p>
          <p>총 금액 : {item.totalAmount}</p>
          <div>

            {item.orderDetails.map((detail) => {
              return (
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    height: 150,
                    width: 900,
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 10px",
                    margin: 10,
                    gap: 20,
                  }}
                key={detail.orderDetailId}
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
                  <div>
                    <p>{detail.bookTitle}</p>
                  </div>
                  <div
                  style={{
                    marginLeft: "auto",
                  }}>
                    <p>도서 가격 : {detail.bookPrice}</p>
                    <p>구매 수량 : {detail.quantity}</p>
                    <p>총 금액 : {detail.totalPrice}</p>
                  </div>
                </div>
              );
            })}
            </div>
          
        </div>
        <div style={{ marginBottom: "auto" }}>
          <button onClick={() => onNaviOrderDetail(item)}>주문 상세</button>
        </div>
      </div>
    );
  });

  return <div>{orderListResult}</div>;
}

export default OrderList;
