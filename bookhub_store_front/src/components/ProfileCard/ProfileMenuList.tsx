import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileCard.module.css";
import Withdraw from "../../pages/myPage/Withdraw";

function ProfileMenuList() {
  return (
    <div className={styles.profileMenuListContainter}>
      <div>
        <ul>
          <li>
            <Link to="/mypage/info">
              <span>회원 정보 수정</span>
              <span
                style={{ fontSize: 13, marginLeft: 15, color: "#838383ff" }}
              >
                이름, 전화번호, 이메일
              </span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/order-list">
              <span>주문 내역</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/address-list">
              <span>배송지 목록</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.withdrawButtonContainer}>
        <Withdraw />
      </div>
    </div>
  );
}

export default ProfileMenuList;
