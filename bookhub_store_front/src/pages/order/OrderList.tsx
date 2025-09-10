import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import type { OrderListResponseDto } from "../../dtos/order/OrderListResponse.dto";
import { useNavigate } from "react-router-dom";
import styles from "./Order.module.css";

function OrderList(props: { orderList: OrderListResponseDto[] }) {
  const orderList = props.orderList;
  const navigation = useNavigate();

  const onNaviOrderDetail = (order: OrderListResponseDto) => {
    navigation("/mypage/order-list/detail", {
      state: {
        order,
      },
    });
  };

  const orderListResult = orderList
    .filter((i) => i.status != "PENDING")
    .map((item) => {
      const [datePart] = item.orderDate.split("T");
      return (
        <div className={styles.orderListElementContainer} key={item.orderId}>
          <div className={styles.orderListElement1}>
            <div>
              <span>
                <strong>{datePart}</strong>
              </span>
              <span style={{ color: "#a0a0a0", fontWeight: "bold"}}>{item.status == "PAID" ? "결제 완료" : "결제 실패"}</span>
              <p className={styles.orderName}>{item.orderName}</p>
              <p><strong>결제 금액</strong>{item.totalAmount}원</p>
            </div>
            <button onClick={() => onNaviOrderDetail(item)}>주문 상세</button>
          </div>

          {item.orderDetails.map((detail) => {
            return (
              <div
                className={styles.orderListElement2}
                key={detail.orderDetailId}
              >
                <div className={styles.bookCover}>
                  <p>표지</p>
                </div>

                <div className={styles.content}>
                  <p style={{padding: 0, margin: "0px 0px 10px 0px"}}>{detail.bookTitle}</p>
                  <span><strong>가격</strong>{detail.bookPrice}원</span>
                  <span><strong>구매 수량</strong>{detail.quantity}</span>
                </div>

                <div className={styles.totalPrice}>
                  <p><strong>총 금액</strong>{detail.totalPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    });

  return <div>{orderListResult}</div>;
}

export default OrderList;
