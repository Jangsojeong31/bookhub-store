import React from "react";
import defaultImage from "../../assets/images/북허브_로고_배경제거2.png";
interface ProfileImgeSectionProps {
  nickname: string;
  profileImageUrl?: string;
}

const ProfileImageSection: React.FC<ProfileImgeSectionProps> = ({
  nickname,
  profileImageUrl,
}) => {
    const BASE_URL = import.meta.env.VITE_API_DOMAIN;

  return (
    <div
      style={{
        flex: "2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <img
        src={`${BASE_URL}${encodeURI(profileImageUrl!)}` || defaultImage}
        alt="프로필 이미지"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      />
      <p>닉네임: {nickname}</p>
    </div>
  );
};

export default ProfileImageSection;
