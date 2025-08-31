import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import { getMyNickname, updateNickname } from "../../apis/customer";
import { useCookies } from "react-cookie";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import styles from "./MyPage.module.css";


function UpdateNickname() {
  const [nickname, setNickname] = useState("");
  const token = useToken();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setNickname(user?.nickname ?? "user");
  }, []);

  const onUpdateNickname = async () => {
    const dto = { nickname };

    const res = await updateNickname(dto, token);
    const { code, message } = res;

    if (code != "success") {
      return;
    } else {
      alert("닉네임이 변경되었습니다.");
      navigate(-1);
    }
  };

  return (
    <ProfileCardFrame>
      <div className={styles.formContainer}>
        <h3>닉네임 변경</h3>
        <div className={styles.formElement}>
<p>

        닉네임
</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요"
          />
          </div>
      <button onClick={onUpdateNickname}>저장</button>
      </div>
    </ProfileCardFrame>
  );
}

export default UpdateNickname;
