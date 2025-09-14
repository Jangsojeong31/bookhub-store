import React, { useState } from 'react'
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import "./Checkout.css";
import useToken from '../../hooks/useToken';
import type { ConfirmPaymentRequestDto } from '../../dtos/payment/ConfirmPaymentRequest.dto';
import { confirmPayment } from '../../apis/payment';
import { removeCartItems } from '../../apis/cart';
import type { RemoveCartItemRequestDto } from '../../dtos/cart/RemoveCartItemRequest.dto';

function Success() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const itemIdsParam = searchParams.get("itemIds");
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const [orderName, setOrderName] = useState("");
  
  const token = useToken();
  const navigate = useNavigate();

  const handleConfirmPayment = async() => {
    const dto: ConfirmPaymentRequestDto = {
      paymentKey: paymentKey!,
      orderId: orderId!,
      amount: amount!
    }

    const res = await confirmPayment(dto, token);

    const { code, message, data } = res;
    console.log(res);

    if (code == "SU" && data) {
      alert("결제 성공")
      setOrderName(data.orderName);
      setIsConfirmed(true);

      const itemIds = itemIdsParam ? itemIdsParam.split(",").map(id => parseInt(id)) : [];

      const dto: RemoveCartItemRequestDto = {
        cartItemIds: itemIds
      };

      if (itemIds.length > 0)
      await removeCartItems(dto, token);
    
    } else {
      console.log(code, message, data);
      if (message) {
        alert(message);
      } else {
        alert("결제 실패. 다시 시도해주세요")
      }
      return;
    }
  }

  const handleNaviToMain = () => {
    navigate("/main");
  }

  const handleNaviToCart = () => {
    navigate("/cart");
  }
  return (
    <div className="wrapper w-100">
      {isConfirmed ? (
        <div
          className="flex-column align-center confirm-success w-100 max-w-540"
          style={{
            display: "flex"
          }}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
          />
          <h2 className="title">결제를 완료했어요</h2>
          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문 내용</span>
              <span id="orderName" className="response-text">
                {orderName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">
                {amount}원
              </span>
            </div>
          </div>

          <div className="w-100 button-group">
            <div className="navi-button-container">
              <button onClick={handleNaviToMain}>메인 화면으로 가기</button>
              <button onClick={handleNaviToCart}>장바구니로 돌아가기</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              width="120"
              height="120"
            />
            <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
          </div>
          <div className="w-100">
            <button className="btn primary w-100" onClick={handleConfirmPayment}>
            결제 승인하기
          </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Success