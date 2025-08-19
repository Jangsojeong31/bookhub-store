import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Layout from "../../components/layouts/Layout";

function UpdateMyInfo() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const token = cookies.accessToken;
      
      const res = await axios.get(
        "http://localhost:8080/api/v1/customer/me/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.data;
      console.log({ ...data });
      const { email, phoneNumber } = data;
      setEmail(email);
      setPhoneNumber(phoneNumber);
    };

    fetchMyInfo();
  }, []);

  return (
    <Layout>
      <h2>회원 정보 변경 페이지</h2>
      <p>이름 : </p>
      <p>이메일 : {email}</p>
      <input
        type="text"
        value={email}
        placeholder="변경할 이메일을 입력해주세요"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>저장</button>
      <p>전화번호 : {phoneNumber}</p>
      <input
        type="text"
        value={phoneNumber}
        placeholder="변경할 이메일을 입력해주세요"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button>저장</button>
    </Layout>
  );
}

export default UpdateMyInfo;
