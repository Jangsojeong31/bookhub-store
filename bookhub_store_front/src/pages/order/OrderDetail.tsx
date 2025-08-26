import React from "react";
import TitleBar from "../../components/TitleBar";
import type {
  OrderDetailResponseDto,
} from "../../dtos/order/OrderListResponse.dto";
import { useLocation } from "react-router-dom";

function OrderDetail() {
  const location = useLocation();
  const { order } = location.state || {};
  const [datePart] = order.orderDate.split("T");

  return (
    <TitleBar title="주문 상세">
      <div>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: 20,
          }}
        >
          <p>주문 일자 : {datePart}</p>
          <p>주문 번호 : {order.orderNumber}</p>
        </div>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: 20,
          }}
        >
          <h4>주문자 정보 (이름, 배송지, 전화번호)</h4>
          <p>주문자 이메일 : {order.customerEmail}</p>
          <p>배송지 : {order.address}</p>
        </div>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: 20,
          }}
        >
          <h4>주문 상품</h4>
          <div>
            {order.orderDetails.map((detail: OrderDetailResponseDto) => {
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
                    }}
                  >
                    <p>도서 가격 : {detail.bookPrice}</p>
                    <p>구매 수량 : {detail.quantity}</p>
                    <p>총 금액 : {detail.totalPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: 20,
          }}
        >
          <h4>결제 정보</h4>
          <p>결제 수단 : {order.paymentMethod}</p>
          <p>결제 상태 : {order.status}</p>
          <p>결제 금액 : {order.totalAmount}</p>
        </div>
      </div>
    </TitleBar>
  );
}

export default OrderDetail;
