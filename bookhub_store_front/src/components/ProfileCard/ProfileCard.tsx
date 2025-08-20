import React from "react";
import { Link } from "react-router-dom";
import "./NavButton.css";
import ProfileImageSection from "./ProfileImageSection";
import ProfileActionButtons from "./ProfileActionButtons";
import ProfileMenuList from "./ProfileMenuList";

interface ProfileCardProps {
  nickname: string;
  profileImageUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  nickname,
  profileImageUrl,
}) => {
  return (
    <div
      style={{
        width: 500,
        height: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "30px",
        padding: "20px 20px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ProfileImageSection
        nickname={nickname}
        profileImageUrl={profileImageUrl}
      />
      <ProfileActionButtons />
      <ProfileMenuList />
    </div>
  );
};

export default ProfileCard;
