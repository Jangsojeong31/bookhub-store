import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import { updateNickname } from "../../apis/customer";
import { useCookies } from "react-cookie";

function UpdateNickname() {
  const [nickname, setNickname] = useState("");
    const [cookies] = useCookies(["accessToken"]);
  

  useEffect(() => {
    const fetchNickname = async () => {};

    fetchNickname();
  }, []);

  const onUpdateNickname = async () => {
        const token = cookies.accessToken;
        const dto = {nickname};

    const res = await updateNickname(dto, token);
    const {code, message, data} = res;

    if(code != "success") {
      return;
    } else {
      alert("성공")
    }
  };

  return (
    <Layout>
      <ProfileCardFrame>
        <div style={{marginBottom: "auto", marginTop: "auto"}}>
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
    </Layout>
  );
}

export default UpdateNickname;
