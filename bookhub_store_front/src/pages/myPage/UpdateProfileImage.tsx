import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import logo from "../../assets/images/북허브_로고_배경제거2.png";
import useToken from "../../hooks/useToken";
import { updateProfileImage } from "../../apis/customer";

function UpdateProfileImage() {
  const [profileImage, setProfileImage] = useState("");
  const token = useToken();

  useEffect(() => {
    const fetchProfileIamge = async () => {};

    fetchProfileIamge();
  }, []);

  const onUpdateProfileImage = async () => {
    const dto = {profileImageUrl: profileImage}
    const res = await updateProfileImage(dto, token);
  };

  return (
    <Layout>
      <ProfileCardFrame>
        <div
          style={{
            marginBottom: "auto",
            marginTop: "auto",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20
          }}
        >
          <p>프로필 이미지</p>
          <img
          src={logo}
          alt="북허브_로고"
          style={{ height: 100, cursor: "pointer", border: "1px solid #ccc", borderRadius: "50px"}}
        />
          <button>변경할 이미지 선택</button>
        </div>
        <button onClick={onUpdateProfileImage}>저장</button>
      </ProfileCardFrame>
    </Layout>
  );
}

export default UpdateProfileImage;
