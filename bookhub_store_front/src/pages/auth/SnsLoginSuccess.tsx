import React, { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

function SnsLoginSuccess() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken", "tokenExpriresAt"]);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const exprTime = params.get("expiration");

    if (token && exprTime) {
      const exprDate = new Date(Date.now() + Number(exprTime));

      setCookie("accessToken", token, {
        path: "/",
        expires: exprDate,
        sameSite: "strict"
      });

      setCookie("tokenExpriresAt", exprDate.toISOString(), {
        path: "/",
        sameSite: "strict"
      })

      window.history.replaceState({}, document.title, "/");

      alert("로그인 성공")
      navigate("/");

      processedRef.current = true;
    } else {
      alert("로그인 실패");
      navigate("/login");
    }
  }, [navigate, setCookie]);


  return (
    <div>로그인 처리중...</div>
  )
}

export default SnsLoginSuccess