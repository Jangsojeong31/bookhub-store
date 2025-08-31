import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileCard.module.css";

function ProfileActionButtons() {
  return (
    <div
      className={styles.profileActionButtonContainer}
    >
      <div>
        <Link to="/mypage/nickname" className={styles.profileActionButton}>
          닉네임 변경
        </Link>
      </div>
      <div>
        <Link to="/mypage/profile-image" className={styles.profileActionButton}>
          프로필 이미지 변경
        </Link>
      </div>
    </div>
  );
}

export default ProfileActionButtons;
