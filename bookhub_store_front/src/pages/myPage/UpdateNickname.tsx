import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import { getMyNickname, updateNickname } from "../../apis/customer";
import { useCookies } from "react-cookie";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

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
      <div style={{ marginBottom: "auto", marginTop: "auto" }}>
        닉네임 :
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요"
        ></input>
      </div>
      <button onClick={onUpdateNickname}>저장</button>
    </ProfileCardFrame>
  );
}

export default UpdateNickname;
