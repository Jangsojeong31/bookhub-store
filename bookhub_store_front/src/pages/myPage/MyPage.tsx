import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import useToken from "../../hooks/useToken";
import { getMyNickname, getMyProfileImage } from "../../apis/customer";

function MyPage() {
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const token = useToken();

  useEffect(() => {
    const fetchProfileImage = async () => {
      const res = await getMyProfileImage(token);
      const { code, message, data } = res;

      if (code == "success" && data) {
        setProfileImageUrl(data.profileImage);
      } else {
        return;
      }
    };

    const fetchNickname = async () => {
      const res = await getMyNickname(token);
      const { code, message, data } = res;

      if (code == "success" && data) {
        setNickname(data.nickname);
      } else {
        return;
      }
    };

    fetchProfileImage();
    fetchNickname();
  }, []);

  return <ProfileCard nickname={nickname} profileImageUrl={profileImageUrl} />;
}

export default MyPage;
