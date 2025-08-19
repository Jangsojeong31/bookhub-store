import React from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '../../components/layouts/Layout';

function Login() {
  const handleSnsLogin = (provider: string) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  }
  
  return (
    <Layout>
      <p>로그인 화면 입니다.</p>
      <button onClick={() => handleSnsLogin("kakao")}>kakao 로그인</button>
      <button onClick={() => handleSnsLogin("goole")}>goole 로그인</button>
      <button onClick={() => handleSnsLogin("naver")}>naver 로그인</button>

    </Layout>
  )
}

export default Login