import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

function MyPage() {
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {};

    fetchProfile();
  }, []);

  return (
    <Layout>
      <ProfileCard nickname={nickname} profileImageUrl={profileImageUrl} />
    </Layout>
  );
}

export default MyPage;
