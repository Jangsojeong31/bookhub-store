import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import useToken from "../../hooks/useToken";
import { getMyNickname, getMyProfileImage } from "../../apis/customer";
import { useAuthStore } from "../../stores/useAuthStore";

function MyPage() {
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    setNickname(user?.nickname ?? "user");
    setProfileImageUrl(user?.profileImageUrl ?? "");
  }, []);

  return <ProfileCard nickname={nickname} profileImageUrl={profileImageUrl} />;
}

export default MyPage;
