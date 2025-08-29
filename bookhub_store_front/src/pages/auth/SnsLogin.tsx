import React from "react";

function SnsLogin() {
  const handleSnsLogin = (provider: string) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
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
        <button onClick={() => handleSnsLogin("kakao")}>kakao 로그인</button>
        <button onClick={() => handleSnsLogin("goole")}>goole 로그인</button>
        <button onClick={() => handleSnsLogin("naver")}>naver 로그인</button>
      </div>
    </div>
  );
}

export default SnsLogin;
