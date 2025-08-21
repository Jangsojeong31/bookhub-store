import React from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import logo from "../../assets/images/북허브_로고_배경제거2.png";
import Logo from "../../components/header/Logo";

function Login() {
  const handleSnsLogin = (provider: string) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div style={{ marginLeft: "auto", marginRight: "auto", height: 200}}>
          <Logo />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" placeholder="이메일" />
          <input type="text" placeholder="비밀번호" />
        </div>
        <button>로그인 버튼</button>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 20,
            textAlign: "center",
            width: 500,
            height: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          간편 로그인
          <div style={{ display: "flex", gap: 20 }}>
            <button onClick={() => handleSnsLogin("kakao")}>
              kakao 로그인
            </button>
            <button onClick={() => handleSnsLogin("goole")}>
              goole 로그인
            </button>
            <button onClick={() => handleSnsLogin("naver")}>
              naver 로그인
            </button>
          </div>
        </div>
        <button>회원가입 버튼</button>
      </div>
    
  );
}

export default Login;
