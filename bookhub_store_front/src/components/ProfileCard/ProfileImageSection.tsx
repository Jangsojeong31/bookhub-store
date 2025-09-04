import React from "react";
import defaultImage from "../../assets/images/bh_store_logo_4.png";
interface ProfileImgeSectionProps {
  nickname: string;
  profileImageUrl?: string;
}
import styles from "./ProfileCard.module.css";

const ProfileImageSection: React.FC<ProfileImgeSectionProps> = ({
  nickname,
  profileImageUrl,
}) => {
    const BASE_URL = import.meta.env.VITE_API_DOMAIN;

  return (
    <div
      className={styles.profileImageSection}
    >
      <img
        src={`${BASE_URL}${encodeURI(profileImageUrl!)}` || defaultImage}
        alt="프로필 이미지"
        className={styles.profileImage}
      />
      <p>닉네임 : {nickname}</p>
    </div>
  );
};

export default ProfileImageSection;
