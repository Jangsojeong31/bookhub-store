import React from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../apis/axiosConfig';
import { logout } from '../../apis/auth';
import { useCookies } from 'react-cookie';

function AuthButton() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();

  const handleLogout = async () => {
    const res = await logout();

    if (res.code == "SU") {
      removeCookie("accessToken", { path: "/"})
      removeCookie("tokenExpiresAt", { path: "/"})
      
      clearAuth();
      navigate("/");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  }

  return user ? (
    <button onClick={handleLogout}>로그아웃</button>
  ) : (
    <Link to="/login">
      <button>로그인 / 회원가입</button>
    </Link>
  )
}

export default AuthButton