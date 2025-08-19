import React from "react";
import { Link } from "react-router-dom";

function ProfileActionButtons() {
  return (
    <div
      style={{ flex: "1", display: "flex", justifyContent: "center", gap: 20 }}
    >
      <div>
        <Link to="/mypage/nickname" className="nav-button">
          닉네임 변경
        </Link>
      </div>
      <div>
        <Link to="/mypage/profile-image" className="nav-button">
          프로필 이미지 변경
        </Link>
      </div>
    </div>
  );
}

export default ProfileActionButtons;
