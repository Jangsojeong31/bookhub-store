import React from 'react'
import { withdrawUser } from '../../apis/customer'
import useToken from '../../hooks/useToken';
import styles from './MyPage.module.css';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { useCookies } from 'react-cookie';

function Withdraw() {
  const token = useToken();
  const { logout } = useAuthStore();
  const { clearUser } = useUserStore();
  const [, removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?")
    if (!isConfirmed) return;

    const res = await withdrawUser(token);
    const { code, message } = res;
    
    if (code == "SU") {
      alert("회원 탈퇴 성공")
      navigate("/main");
      logout();
      clearUser();
      removeCookie("accessToken", { path: "/" });
      removeCookie("tokenExpiresAt", { path: "/" });
    } else {
      return;
    }
  }
  return (
    <div>
      <button onClick={handleWithdraw} className={styles.withdrawButton}>
        회원 탈퇴 
      </button>
    </div>
  )
}

export default Withdraw

