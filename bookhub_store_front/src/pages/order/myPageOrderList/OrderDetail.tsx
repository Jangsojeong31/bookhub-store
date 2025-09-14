import React, { useEffect, useState } from "react";
import TitleBar from "../../../components/TitleBar";
import type { OrderDetailResponseDto } from "../../../dtos/order/OrderListResponse.dto";
import { useLocation } from "react-router-dom";
import useToken from "../../../hooks/useToken";
import { getPaymentByOrderId } from "../../../apis/payment";
import styles from "./Order.module.css";

function OrderDetail() {
  const location = useLocation();
  const { order } = location.state || {};
  const orderId = order.orderId;
  const [datePart] = order.orderDate.split("T");
  const token = useToken();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      const res = await getPaymentByOrderId(orderId, token);
      const { code, message, data } = res;

      if (code == "SU" && data) {
        setPaymentMethod(data.paymentMethod);
        setPaymentStatus(data.status);
        setTotalAmount(data.amount);
      } else {
        return;
      }
    };

    fetchPayment();
  }, []);

  return (
    <TitleBar title="주문 상세">
      <div>
        <div className={styles.orderDetailElement}>
            <p>
              <strong>주문 일자</strong>{datePart}
            </p>
            <p>
              <strong>주문 번호</strong>{order.orderNumber}
            </p>
        </div>

        <div className={styles.orderDetailElement}>
          <h3>배송 정보</h3>
          <p><strong>수령인</strong>{order.recipientName}</p>
          <p><strong>전화번호</strong>{order.phoneNumber}</p>
          <p>
            <strong>배송지</strong>{order.fullAddress} 
            {order.addressDetail}
          </p>
        </div>
        <div className={styles.orderDetailElement}>
          <h3>주문 상품</h3>
          {order.orderDetails.map((detail: OrderDetailResponseDto) => {
            return (
              <div
                className={styles.orderDetailProductContainer}
                                key={detail.orderDetailId}
              >
                <div className={styles.bookCover}>
                  <img src={detail.coverUrl} alt={detail.bookTitle}/>
                </div>

                <div className={styles.content}>
                  <p style={{padding: 0, margin: "0px 0px 10px 0px"}}>{detail.bookTitle}</p>
                  <span><strong>가격</strong>{detail.bookPrice}원</span>
                  <span><strong>구매 수량</strong>{detail.quantity}</span>
                </div>

                <div className={styles.totalPrice}>
                  <p><strong>할인 금액</strong>{detail.bookPrice * detail.quantity - detail.totalPrice}원</p>
                  <p><strong>총 금액</strong>{detail.totalPrice}원</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.orderDetailElement}>
          <h3>결제 정보</h3>
          <p><strong>결제 수단</strong>{paymentMethod}</p>
          <p>
            <strong>결제 상태</strong>{paymentStatus == "DONE" ? "결제 완료" : "결제 실패"}
          </p>
          <p><strong>결제 금액</strong>{totalAmount}원</p>
        </div>
      </div>
    </TitleBar>
  );
}

export default OrderDetail;
