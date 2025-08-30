import React, { use } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../apis/axiosConfig';
import { logout } from '../../apis/auth';
import { useCookies } from 'react-cookie';
import "./Header.css";

function AuthButton() {
  const setLogout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [, removeCookie] = useCookies();

  const handleLogout = async () => {
    const res = await logout();

    if (res.code == "SU") {
      removeCookie("accessToken", { path: "/"})
      removeCookie("tokenExpiresAt", { path: "/"})
      
      setLogout();
      navigate("/");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  }

  return isLoggedIn ? (
  <button className="auth-button" onClick={handleLogout}>로그아웃</button>
  ) : (
    <Link to="/login">
      <button className='auth-button'>로그인 / 회원가입</button>
    </Link>
  )
}

export default AuthButton