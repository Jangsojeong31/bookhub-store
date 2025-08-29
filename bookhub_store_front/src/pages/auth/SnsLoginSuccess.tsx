import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { snsLogin } from "../../apis/auth";
import { useAuthStore } from "../../stores/useAuthStore";

function SnsLoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  
  const [, setCookie] = useCookies(["accessToken", "tokenExpriresAt"]);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {


    const handleSnsLogin = async () => {
      const res = await snsLogin(Number(userId));

      const { code, message, data } = res;

      if (code == "SU" && data) {
        const token = data.token;
        const exprTime = data.exprTime;
        const user = data.user;

      setAuth(token, exprTime, user);

        const exprDate = new Date(Date.now() + Number(exprTime));

        setCookie("accessToken", token, {
          path: "/",
          expires: exprDate,
          sameSite: "strict",
        });

        setCookie("tokenExpriresAt", exprDate.toISOString(), {
          path: "/",
          sameSite: "strict",
        });

        alert("로그인 성공");
        navigate("/");
      } else {
        alert("로그인 실패");
        navigate("/login");
      }
    };

    handleSnsLogin();

  }, [navigate, userId]);

  return <div>로그인 처리중...</div>;
}

export default SnsLoginSuccess;
