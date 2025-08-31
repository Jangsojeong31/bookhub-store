import React from "react";
import styles from "../pages/cart/Cart.module.css";

interface OverviewProps {
  totalPrice: number;
  discount: number;
  finalPrice: number;
  button: React.ReactNode;
}

function StickyCartOverview({
  totalPrice,
  discount,
  finalPrice,
  button,
}: OverviewProps) {
  return (
    <div
      className={styles.cartOverview}
    >
      <div
        className={styles.cartOverviewContent}
      >
        <div><strong>상품 금액</strong>{totalPrice}원</div>
        <div><strong>할인</strong>{discount}원</div>
        <div><strong>결제 금액</strong>{finalPrice}원</div>
      </div>
      {button}
    </div>
  );
}

export default StickyCartOverview;
