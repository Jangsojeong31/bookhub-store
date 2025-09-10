import React from "react";
import defaultImage from "../../assets/images/기본_프로필_이미지.png";
interface ProfileImgeSectionProps {
  nickname: string;
  profileImageUrl?: string | null;
}
import styles from "./ProfileCard.module.css";

const ProfileImageSection: React.FC<ProfileImgeSectionProps> = ({
  nickname,
  profileImageUrl,
}) => {
  const BASE_URL = import.meta.env.VITE_API_DOMAIN; // http://localhost:8080
  console.log(profileImageUrl);

  return (
    <div className={styles.profileImageSection}>
      <img
        src={
          profileImageUrl && profileImageUrl.startsWith("/files")
            ? `${BASE_URL}${encodeURI(profileImageUrl!)}`
            : profileImageUrl
            ? profileImageUrl
            : defaultImage
        }
        alt="프로필 이미지"
        className={styles.profileImage}
      />
      <p>
        <strong style={{ marginRight: 10 }}>닉네임</strong>
        {nickname}
      </p>
    </div>
  );
};

export default ProfileImageSection;
