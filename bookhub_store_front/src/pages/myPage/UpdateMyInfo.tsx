import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import useToken from "../../hooks/useToken";
import { getCustomerInfo, updateCustomerInfo } from "../../apis/customer";
import "./MyPage.css";

function UpdateMyInfo() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const token = useToken();

  useEffect(() => {
    const fetchMyInfo = async () => {
      const res = await getCustomerInfo(token);

      const { code, message, data } = res;

      if (code == "success" && data) {
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
      } else {
        alert("회원정보 불러오기 실패");
      }
    };

    fetchMyInfo();
  }, []);

  const onUpdateMyInfo = async () => {
    const dto = { email, phoneNumber };
    const res = await updateCustomerInfo(dto, token);
    const { code, message } = res;
    if (code != "success") {
      alert("실패");
    } else {
      alert("성공");
    }
  };

  return (
    
      <ProfileCardFrame>
        <div
          style={{
            marginBottom: "auto",
            marginTop: "auto",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <p>이름 : </p>
          </div>
          <div>
            <p>이메일 : </p>
            <input
              type="text"
              value={email}
              placeholder="변경할 이메일을 입력해주세요"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>전화번호 : </p>
            <input
              type="text"
              value={phoneNumber}
              placeholder="변경할 이메일을 입력해주세요"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <button onClick={onUpdateMyInfo}>저장</button>
      </ProfileCardFrame>
    
  );
}

export default UpdateMyInfo;
