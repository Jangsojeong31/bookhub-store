import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import { getMyNickname, updateNickname } from "../../apis/customer";
import { useCookies } from "react-cookie";
import useToken from "../../hooks/useToken";

function UpdateNickname() {
  const [nickname, setNickname] = useState("");
  const token = useToken();

  useEffect(() => {
    const fetchNickname = async () => {
      const res = await getMyNickname(token);
      const { code, message, data } = res;

      if (code == "success" && data) {
        setNickname(data.nickname);
      } else {
        return;
      }
    };

    fetchNickname();
  }, []);

  const onUpdateNickname = async () => {
    const dto = { nickname };

    const res = await updateNickname(dto, token);
    const { code, message } = res;

    if (code != "success") {
      return;
    } else {
      alert("성공");
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
