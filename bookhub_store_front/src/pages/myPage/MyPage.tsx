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
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProfileCard nickname={nickname} profileImageUrl={profileImageUrl} />
      </div>
    </Layout>
  );
}

export default MyPage;
