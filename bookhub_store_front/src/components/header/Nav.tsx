import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../layouts/Layout.module.css";
import { useAuthStore } from "../../stores/useAuthStore";
import AuthButton from "./AuthButton";

function Nav() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const profileImage = user?.profileImageUrl;
  const BASE_URL = import.meta.env.VITE_API_DOMAIN;

  const onNaviMypage = () => {
    navigate("/mypage");
  };

  const onNaviCart = () => {
    navigate("/cart");
  };

  return (
    <div className={style.navigation}>
      <div className={style.naviButtonContainer}>
        <button onClick={onNaviMypage} className={style.naviButton}>
          마이
        </button>
        <div className={style.naviLine}></div>
        <button onClick={onNaviCart} className={style.naviButton}>
          장바구니
        </button>
        <div className={style.naviLine}></div>
        <AuthButton />
      </div>

      {user ? (
        <div className={style.profileImageAndNickname}>
          <img
            src={`${BASE_URL}${encodeURI(profileImage!)}`}
            className={style.naviProfileImage}
          />
          <span className={style.naviNickname}>{user?.nickname ?? "user"}</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Nav;
