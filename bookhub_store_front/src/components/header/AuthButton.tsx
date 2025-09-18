import React, { use } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import { useCookies } from "react-cookie";
import style from "../layouts/Layout.module.css";
import { useUserStore } from "../../stores/useUserStore";


function AuthButton() {
  const setLogout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { clearUser } = useUserStore();
  const navigate = useNavigate();
  const [, removeCookie] = useCookies();

  const handleLogout = async () => {
    const res = await logout();

    if (res.code == "SU") {
      removeCookie("accessToken", { path: "/" });
      removeCookie("tokenExpiresAt", { path: "/" });

      setLogout();
      clearUser();
      navigate("/");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const onNaviLogin = () => {
    navigate("/login");
  };

  return isLoggedIn ? (
    <button  className={style.naviButton} onClick={handleLogout}>
      로그아웃
    </button>
  ) : (
    <button  className={style.naviButton} onClick={onNaviLogin}>
      로그인 / 회원가입
    </button>
  );
}

export default AuthButton;
