import React from "react";
import { Link } from "react-router-dom";

function ProfileMenuList() {
  return (
    <div style={{ flex: "3" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
          listStyle: "none",
          textAlign: "left",
        }}
      >
        <li>
          <Link to="/mypage/info">
          <span>회원 정보 수정</span>
          <span>이름, 생년월일, 휴대폰번호, 이메일</span>
          </Link>
        </li>
        <li>
          <Link to="/mypage/order-list">
          주문 내역
          </Link>
          </li>
        <li>배송지 목록</li>
      </ul>
    </div>
  );
}

export default ProfileMenuList;
