import React from "react";
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
      style={{
        top: 100,
        border: "2px solid rgba(51, 19, 19, 0.15)",
        borderRadius: 20,
        height: 500,
        width: 350,
        margin: 10,
        position: "sticky",
        padding: 10,

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div>상품 금액 : {totalPrice}원</div>
        <div>할인 : {discount}원</div>
        <div>결제 금액 : {finalPrice}원</div>
      </div>
      {button}
    </div>
  );
}

export default StickyCartOverview;
