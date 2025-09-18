import React from "react";
import "./Login.css";
import kakao from "../../assets/images/카카오_로그인_아이콘.webp";
import googleLogo from "../../assets/images/google_logo.png";
import naver from "../../assets/images/네이버_로그인_아이콘.png";
import { API_BASE } from "../../config/runtimeConfig"

function SnsLogin() {
  const handleSnsLogin = (provider: string) => {
    window.location.href = `${API_BASE}/oauth2/authorization/${provider}`;
    console.log(API_BASE);
  };

  return (
    <div className="SnsLoginCotainer">
      <h4>소셜 계정으로 간편 로그인</h4>
      <div className="SnsLoginIcons">
        <img
          src={kakao}
          alt="kakao"
          className="SnsLoginImage"
          onClick={() => handleSnsLogin("kakao")}
        ></img>

        <button
          onClick={() => handleSnsLogin("google")}
          className="SnsLoginButton"
        >
          <img src={googleLogo} alt="google" className="SnsLoginLogo" />
          
        </button>

        <img
          src={naver}
          alt="naver"
          className="SnsLoginImage"
          onClick={() => handleSnsLogin("naver")}
        ></img>
      </div>
    </div>
  );
}

export default SnsLogin;
