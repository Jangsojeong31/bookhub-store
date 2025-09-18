import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useUserStore } from "../../stores/useUserStore";

function MyPage() {
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>("");
  const { user } = useUserStore();

  useEffect(() => {
    setNickname(user?.nickname ?? "user");
    setProfileImageUrl(user?.profileImageUrl ?? null);
  }, []);

  return <ProfileCard nickname={nickname} profileImageUrl={profileImageUrl} />;
}

export default MyPage;
