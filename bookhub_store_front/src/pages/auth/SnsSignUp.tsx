import React from 'react'
import Logo from '../../components/header/Logo'

function SnsSignUp() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 500,}}>
      <div style={{ marginLeft: "auto", marginRight: "auto", height: 200 }}>
        <Logo />
      </div>
      소셜 회원가입
      <div style={{ display: "flex", flexDirection: "column", gap: 20,}}>
          <input type="text" placeholder="이메일" />
          <input type="text" placeholder="비밀번호" />
          <input type="text" placeholder="이름" />
          <input type="text" placeholder="전화번호" />
        </div>
        <button>회원가입</button>
    </div>
  )
}

export default SnsSignUp