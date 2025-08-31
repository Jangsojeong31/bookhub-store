import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import useToken from "../../hooks/useToken";
import { getCustomerInfo, updateCustomerInfo } from "../../apis/customer";
import styles from "./MyPage.module.css";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

function UpdateMyInfo() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const token = useToken();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(user?.email ?? "");
    setName(user?.name ?? "");
    setPhoneNumber(user?.phoneNumber ?? "");
  }, []);

  const onUpdateMyInfo = async () => {
    const dto = { email, name, phoneNumber };
    const res = await updateCustomerInfo(dto, token);
    const { code, message } = res;
    if (code != "success") {
      alert("실패");
    } else {
      alert("성공");
      navigate(-1);
    }
  };

  return (
    <ProfileCardFrame>
      <div className={styles.formContainer}>
        <h3>회원 정보 수정</h3>
        <div className={styles.formElement}>
          <p>이름</p>
          <input
            type="text"
            value={name}
            placeholder="변경할 이름을 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formElement}>
          <p>이메일</p>
          <input
            type="text"
            value={email}
            placeholder="변경할 이메일을 입력해주세요"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formElement}>
          <p>전화번호</p>
          <input
            type="text"
            value={phoneNumber}
            placeholder="변경할 전화번호을 입력해주세요"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button onClick={onUpdateMyInfo}>저장</button>
      </div>
    </ProfileCardFrame>
  );
}

export default UpdateMyInfo;
